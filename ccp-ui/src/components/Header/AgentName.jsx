import { UserCircle } from 'lucide-react'
export default function AgentName({ agentName }) {
    return (<div>
        <h1 className="text-xl font-bold tracking-tight">
            Amazon Connect Custom CCP
        </h1>
        <div id='agent-name' className="flex items-center gap-2 text-xs opacity-80 mt-1">
            <UserCircle size={14} /> <span>{agentName || 'Agent not logged in'}</span><span>• Agent</span>
        </div>
    </div>)
}