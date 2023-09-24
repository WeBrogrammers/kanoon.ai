import { useToast } from "./ui/use-toast"
import { BrainCircuit, User } from 'lucide-react';
import { BeatLoader } from 'react-spinners'

export interface ChatMessagesProps {
    role: "SYSTEM" | "USER",
    content?: string;
    isLoading?: boolean;
}

export function ChatMessages({ role, content, isLoading }: ChatMessagesProps) {
    const { toast } = useToast()
    const onCopy = () => {
        if (!content) return
        navigator.clipboard.writeText(content)
        toast({
            description: "Copied to clipboard",
        })
    }
    
    return (
        <>
            {
            role === "SYSTEM" &&
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            <BrainCircuit />
                        </div>
                        <div className="relative ml-3 cursor-pointer text-sm bg-white py-2 px-4 shadow rounded-xl" onClick={onCopy}>
                            <div>{isLoading ? <BeatLoader size={5} color="grey" /> : content}</div>
                        </div>
                    </div>
                </div>
                }

            {
            role === "USER" &&
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            <User />
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>{content}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}