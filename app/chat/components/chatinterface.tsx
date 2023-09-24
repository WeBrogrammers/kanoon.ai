"use client"
import { ChatMessages, ChatMessagesProps } from '@/components/chatMessages';
import Leftsidebar from './Leftsidebar'
import DropdownMenuCheckboxes from './languageselect';
import { Lawyer, Message } from "@prisma/client"
import {ElementRef, useEffect, useRef, useState } from 'react';

interface chatInterfaceProps {
  messages: ChatMessagesProps[];
  isLoading: boolean;
  lawyer: Lawyer
}

export default function ChatInterface({ lawyer, messages = [], isLoading }: chatInterfaceProps) {
  const scrollRef = useRef<ElementRef<"div">>(null)
  const [fakeLoading, setFakeLoading] = useState(messages.length === 0?true:false)
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setFakeLoading(false)
    },1000)
    return ()=>{clearTimeout(timeout)}
  },[])
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:'smooth'})
  },[])
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <Leftsidebar />
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  <ChatMessages role='SYSTEM' isLoading={fakeLoading} content='Hey how can I help you ?' />
                  {
                    messages.map((msg,i)=>(
                      <ChatMessages role={msg.role} content={msg.content} key={i}/>
                    ))
                  }
                  {
                    isLoading &&
                     <ChatMessages role='SYSTEM' isLoading />
                  }
                  <div ref={scrollRef} />
                </div>
              </div>
            </div>
                {/* <ChatClient/> */}
          </div>
        </div>

      </div>
    </div>
  )
}