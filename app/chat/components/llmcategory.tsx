"use client"

import { cn } from "@/lib/utils";
import {Category} from '@prisma/client'
import {useRouter,useSearchParams} from 'next/navigation'

interface CategoriesProps{
    data:Category[]
}

export default  function LlmCategory({data}:CategoriesProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("categoryId")
    
    const handleClick = (id:String|undefined) =>{
      router.push(`/chat/${id}`)
    }

  return (
    <div className="flex flex-col bg-gray-200 rounded-xl  justify-center mt-5 p-2">
      <div className="flex flex-row items-center justify-between text-xs mt-1  border-solid border-b-5 border-sky-500">
        <span className="font-bold">Available LLM's</span>
        <span className="flex items-center justify-center bg-red-100 h-5 w-5 rounded-full p-2">
          {data.length}
        </span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-20 overflow-y-auto">
        {
          data?.map((item)=>( 
          <button key={item.id} className={cn("flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ml-2 text-sm font-semibold",categoryId==item.id?"bg-red":"")} onClick={()=>handleClick(item.id)}> 
          {/* categoryId==item.id null idk if anyone found pls correct that */}
            {item.name}
          </button>))
        }
       
      </div>
    </div>
  );
}
