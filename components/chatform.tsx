"use client";

import {DropdownMenuCheckboxes} from '../app/chat/components/languageselect';
import {ChangeEvent,FormEvent} from 'react'
import { ChatRequestOptions } from "ai";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link ,Send} from 'lucide-react';

interface ChatFormProps{
    input:string,
    handleInputChange:(e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>)=>void,
    onSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
  isLoading: boolean;

}

export default function ChatForm({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
}: ChatFormProps){
    return(
      <form className="flex flex-row items-center justify-center h-16 rounded-xl bg-white w-full px-4" onSubmit={onSubmit}>
          <div>
            <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
            <Link/>
            </button>
          </div>
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <Input disabled={isLoading} value={input} onChange={handleInputChange} placeholder='Type your message here...' className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
            </div>
          </div>
              <DropdownMenuCheckboxes/>
          <div className="ml-4">
            <Button disabled={isLoading} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
            <Send/>
            </Button>
          </div>
        </form>
    )
}