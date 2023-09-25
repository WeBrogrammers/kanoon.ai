import { StreamingTextResponse , LangChainStream} from "ai";
import { auth,currentUser } from "@clerk/nextjs";
import {CallbackManager} from 'langchain/callbacks';
import { Replicate } from "langchain/llms/replicate";
import { NextResponse } from "next/server";

import {MemoryManager} from '@/lib/memory'
import { rateLimit } from "@/lib/ratelimit";
import prismadb from "@/lib/prismadb";


export async function POST(request:Request,{params}:{params:{chatId:string}}){
    try {
        const {prompt} = await request.json();
        const user = await currentUser()

        if(!user || !user.firstName ||!user.id) return new NextResponse("Unauthorized",{status:401})

        const identifier = request.url + "-" + user.id;
        const {success} = await rateLimit(identifier)

        if(!success) return new NextResponse("Too many requests",{status:429})

         const lawyer = await prismadb.lawyer.update({
           where: {
             id: params.chatId,
           },
           data: {
             messages: {
               create: {
                 content: prompt,
                 role: "USER",
                 userId: user.id,
               },
             },
           },
         });

    if(!lawyer){
        return new NextResponse("Lawyer Not Found",{status:404})
    }

    const lawyerFileName = lawyer.id + ".txt"
    const lawyerKey = {
        lawyerName:lawyer.id,
        userId:user.id,
        modelName:'llama2-13b'
    }
        const memoryManager = await MemoryManager.getInstance();

        const records = await memoryManager.readLatestHistory(lawyerKey);

        if (records.length === 0) {
          await memoryManager.seedChatHistory(
            lawyer.seed,
            "\n\n",
            lawyerKey
          );
        }
        await memoryManager.writeToHistory(
          "User: " + prompt + "\n",
          lawyerKey
        );

        const recentChatHistory = await memoryManager.readLatestHistory(
          lawyerKey
        );

        const similarDocs = await memoryManager.vectorSearch(
          recentChatHistory,
          lawyerFileName
        );

        let relevantHistory = "";
        if (!!similarDocs && similarDocs.length !== 0) {
          relevantHistory = similarDocs
            .map((doc) => doc.pageContent)
            .join("\n");
        }

        const { handlers } = LangChainStream();

        const model = new Replicate({
          model:
            "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
          input: {
            max_length: 2048,
          },
          apiKey: process.env.REPLICATE_API_TOKEN,
          callbackManager: CallbackManager.fromHandlers(handlers),
        });

        model.verbose = true;

        const resp = String(
          await model
            .call(
              `
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${lawyer.name}: prefix. 

        ${lawyer.instructions}

        You are a helpful, respectful and honest lawyer. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. You are allowed to answer the questions which are only related to the legal domain.

        If a question does not make any sense, or is not factually coherent, instead of answering something not correct tell them that i can not help with that. If you don't know the answer to a question, please don't share false information.

        Below are relevant details about ${lawyer.name}'s past and the conversation you are in.
        ${relevantHistory}


        ${recentChatHistory}\n${lawyer.name}:`
            )
            .catch(console.error)
        );

        const cleaned = resp.replaceAll(",", "");
        const chunks = cleaned.split("\n");
        const response = chunks[0];

        await memoryManager.writeToHistory("" + response.trim(), lawyerKey);
        var Readable = require("stream").Readable;

        let s = new Readable();
        s.push(response);
        s.push(null);

        if (response !== undefined && response.length > 1) {
          memoryManager.writeToHistory("" + response.trim(), lawyerKey);

          await prismadb.lawyer.update({
            where: {
              id: params.chatId,
            },
            data: {
              messages: {
                create: {
                  content: response.trim(),
                  role: "SYSTEM",
                  userId: user.id,
                },
              },
            },
          });
        }
        
        return new StreamingTextResponse(s);

    } catch (error) {
        console.log("chat post ->",error);
        return new NextResponse("Internal Server Error",{status:500})
        
    }
}