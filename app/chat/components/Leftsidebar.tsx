import { Bot } from 'lucide-react';
import Uploadfile from './uploadfile';
import LlmCategory from './llmcategory';
import prisma from '@/lib/prismadb'

export default async function Leftsidebar() {
    const category = await prisma?.category.findMany()
    return (
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">

            <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                    <Bot />
                </div>
                <div className="ml-2 font-bold text-2xl">Kanoon.ai</div>
            </div>
            {/* file uploading compnent */}
            <Uploadfile />
            <div className="flex flex-col mt-2">
                <div className="flex flex-row items-center justify-between text-xs">
                    <span className="font-bold">Active Conversations</span>
                    {/* <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span> */}
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-55 overflow-y-auto">
                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                        {/* <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                            H
                        </div> */}
                        <div className="ml-2 text-sm font-semibold">How does it works?</div>
                    </button>
                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                        {/* <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                            M
                        </div> */}
                        <div className="ml-2 text-sm font-semibold">crime.pdf analyse</div>
                        {/* <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                            2
                        </div> */}
                    </button>
                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                        {/* <div className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full">
                            P
                        </div> */}
                        <div className="ml-2 text-sm font-semibold">Truck driver hit me</div>
                    </button>
                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                        {/* <div className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full">
                            C
                        </div> */}
                        <div className="ml-2 text-sm font-semibold">Recharge bill fraud</div>
                    </button>
                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                        {/* <div className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full">
                            J
                        </div> */}
                        <div className="ml-2 text-sm font-semibold">Divorce notice</div>
                    </button>
                </div>
<LlmCategory data={category}/>
            </div>
        </div>
    )
}