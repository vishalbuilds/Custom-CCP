import { MessageSquare, } from "lucide-react";
export default function ChatHome() {




    return (<div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400">
        <MessageSquare size={48} className="mb-4 opacity-20" />
        <p>No active chat conversations</p>
    </div>)


}