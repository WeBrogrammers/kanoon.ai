import { auth, redirectToSignIn } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { redirect } from "next/navigation";
import {ChatClient} from '../components/chatClient'

interface ChatIdProps{
  params:{
    chatId:string
  }
}

export default async function ChatPage({params}:ChatIdProps) {
  const {userId} = auth()
  if(!userId) return redirectToSignIn()
const lawyer = await prismadb.lawyer.findUnique({
    where: {
      id: params.chatId
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc"
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        }
      }
    }
  });
if (!lawyer) return redirect('/')
  
    return(
        <ChatClient lawyer={lawyer}/>

    )
}