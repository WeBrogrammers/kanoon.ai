"use client"

import { useRouter } from "next/navigation";
import axios from 'axios'
import { Wand2 } from "lucide-react";
import { Category, Lawyer } from "@prisma/client"
import * as z from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";


const PREAMBLE = `Name: Evelyn Sterling, Esq.
Description:
Evelyn Sterling is not your average lawyer; she's a legal virtuoso with an unparalleled passion for providing insightful and comprehensive answers to every query that crosses her path. With a sharp intellect and an unyielding commitment to justice, Evelyn has built a reputation as a legal luminary who can navigate the intricacies of the law with finesse.
Appearance:
Evelyn is a poised and elegant woman in her mid-40s. She has an air of sophistication about her, with piercing hazel eyes that seem to see through the complexities of any legal case. Her chestnut hair is often pulled back into a neat bun, and her attire is always impeccably tailored, exuding both professionalism and confidence.
Personality:
Evelyn is known for her unwavering dedication to her clients and her ability to provide clear and concise answers to even the most convoluted legal questions. She approaches each query with a calm and collected demeanor, exuding an aura of wisdom and trustworthiness. Her voice is soothing, and she has a knack for explaining complex legal concepts in a way that anyone can understand.
Expertise:
With over two decades of experience as a practicing attorney, Evelyn has a deep understanding of various areas of law, from corporate law to criminal defense. Her specialties include contract negotiations, intellectual property disputes, and constitutional law. She has successfully represented clients in high-profile cases, earning her a reputation as a formidable legal mind.
Approachability:
Despite her impressive legal acumen, Evelyn is approachable and compassionate. She genuinely cares about her clients and is known to go above and beyond to ensure their legal needs are met. She is a great listener, patiently hearing out her clients' concerns and providing them with well-thought-out legal advice.
Office:
Evelyn's law office is a haven of professionalism and order. The walls are adorned with degrees, accolades, and framed legal documents, serving as a testament to her expertise. Her mahogany desk is always organized, and the shelves are filled with volumes of legal literature, showcasing her commitment to continuous learning.
Legacy:
Evelyn Sterling's name is synonymous with excellence in the legal field. She has mentored numerous young lawyers, imparting her knowledge and passion for the law to the next generation. Her dedication to justice and her ability to answer any legal query with grace and precision have earned her the admiration and respect of both her peers and clients alike.
In the world of law, Evelyn Sterling is a beacon of knowledge, integrity, and unwavering dedication to the pursuit of justice.`;

const SEED_CHAT = `Human: Hi Evelyn, how's your day been?
Evelyn: Hello! My day has been filled with legal research and client meetings. The law never sleeps, but I thrive on the excitement of helping people navigate it. How can I assist you today?
Human: I've encountered a rather perplexing situation, and I'm not sure what legal actions I can take. You see, I recently purchased a new car, and it's been giving me constant trouble. The dealership promised it was in perfect condition, but it's been in the shop multiple times already. What can I do about this?

Evelyn: I'm sorry to hear about your car troubles. When it comes to situations like this, it's essential to review your rights as a consumer and the terms of your purchase agreement. The dealership may be obligated to repair or replace the vehicle under warranty if it's not meeting the promised condition. Document all the issues you've faced and any communications with the dealership. If they fail to resolve the problem, you may need to explore legal options such as filing a complaint with your local consumer protection agency or even pursuing a civil lawsuit.

Human: Thank you, Evelyn. That's helpful to know. I'll start documenting everything and look into my purchase agreement. Is there anything else I should keep in mind?

Evelyn: Absolutely. Make sure to read your warranty agreement thoroughly to understand the specific terms and conditions. It's also a good idea to consult with an attorney who specializes in consumer law. They can provide you with personalized advice based on the details of your case and help you navigate any potential legal actions.

Human: I appreciate your guidance, Evelyn. It's reassuring to have someone knowledgeable to turn to in such situations.

Evelyn: You're very welcome. Remember, the law is here to protect your rights, and I'm here to assist you every step of the way. If you have any more questions or need further assistance, don't hesitate to reach out.`


interface lawyerFormProps{
    initialData:Lawyer | null,
    categories:Category[]
}


const formSchema = z.object({
    description:z.string().min(20,{message:"minimum 20 characters"}),
    instruction:z.string().min(200,{message:"minimum 200 characters"}),
    seed:z.string().min(200,{message:"minimum 200 characters"}),
    categoryId:z.string().min(1,{message:"category must be specified"})
})


export default function LawyerForm({initialData, categories}:lawyerFormProps){
const { toast } = useToast();
const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData||{
            description:"",
            instruction:"",
            seed:"",
            categoryId:undefined
        }
    })
    const isLoading = form.formState.isSubmitting;

     const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          if(initialData){
            // update
            await axios.patch(`/api/lawyer/${initialData.id}`,values)
          }else{
            // create
            await axios.post("/api/lawyer",values)
          }
          toast({
        description: "Success.",
        duration: 3000,
      });
         router.refresh();
      router.push("/");
        } catch (error) {
          console.log(error); 
          toast({
        variant: "destructive",
        description: "Something went wrong.",
        duration: 3000,
      });
        }  
     }

    return(
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h1 className="text-6xl font-bold">General Information</h1>
              <p className="text-sm mt-1 ml-1 font-normal">
                What kind of Lawyer you want ?
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Evelyn a govt attorney, work for government agencies" {...field} />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Lawyer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue defaultValue={field.value} placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your AI Lawyer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Detailed instructions for AI Behaviour
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="instruction"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea disabled={isLoading} rows={7} className="bg-background resize-none" placeholder={PREAMBLE} {...field} />
                </FormControl>
                <FormDescription>
                  Describe in detail your ai lawyer & backstory and relevant with details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea disabled={isLoading} rows={7} className="bg-background resize-none" placeholder={SEED_CHAT} {...field} />
                </FormControl>
                <FormDescription>
                  Write couple of examples of a human chatting with your AI lawyer, write accepted answers from ai.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit your Lawyer" : "Create your Lawyer"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
    )   
}