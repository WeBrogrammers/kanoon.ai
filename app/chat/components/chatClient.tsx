"use client";

import { useCompletion } from "ai/react";
import { FormEvent, useState } from "react";
import { Lawyer, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
// import ChatForm from '../../components/chatform'
import  ChatForm  from "@/components/chatform";
// import { ChatMessageProps } from "@/components/chat-message";
import ChatInterface from './chatinterface';
import { ChatMessagesProps } from "@/components/chatMessages";

interface ChatClientProps {
  lawyer: Lawyer & {
    messages: Message[];
    _count: {
      messages: number;
    }
  };
};

export const ChatClient = ({
  lawyer,
}: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessagesProps[]>(lawyer.messages);
  
  const {
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useCompletion({
    api: `/api/chat/${lawyer.id}`,
    onFinish(prompt, completion) {
      const systemMessage: ChatMessagesProps = {
        role: "SYSTEM",
        content: completion
      };

      setMessages((current) => [...current, systemMessage] )
      setInput("");

      router.refresh();
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessagesProps = {
      role: "USER",
      content: input
    };

    setMessages((current) => [...current, userMessage] )

    handleSubmit(e);
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatInterface 
      lawyer={lawyer}
      isLoading={isLoading}
      messages={messages}
      />
      <ChatForm 
        isLoading={isLoading} 
        input={input} 
        handleInputChange={handleInputChange} 
        onSubmit={onSubmit} 
      />
    </div>
   );
}