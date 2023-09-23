import { Inbox, Loader2 } from "lucide-react";

export default function Uploadfile() {
    return (
      <div className="p-2 bg-white rounded-xl">
      <div className=
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col"
      >
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop Your File Here</p>
      </div>
    </div>
    )
}