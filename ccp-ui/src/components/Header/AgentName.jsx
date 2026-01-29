import { UserCircle } from 'lucide-react'
import useCTX from "../../context/ProviderCtx.jsx";


export default function AgentName() {

    const { state } = useCTX();
    return (<div>

        <div id='agent-name' className="flex items-center gap-2 text-sm m-2">
            <UserCircle size={20} /> <h1>{state.agentConfig.firstName} {state.agentConfig.lastName} ({state.agentConfig.username}) • Agent</h1>
        </div>
    </div>)
}