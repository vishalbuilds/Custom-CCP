import { UserCircle } from "lucide-react";
export default function AgentHome({ agentName }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <UserCircle size={80} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">
                Welcome, {agentName}

            </h2>
        </div>
    )
}