
import { useAppState, useAppRef } from "../../context/ProviderCtx";
import StatusDuration from './StatusDuration.jsx';


import AgentName from './AgentName.jsx';
import StatusDropdown from './StatusDropdown.jsx';
import SettingsButton from './SettingsButton.jsx';



export default function Header() {
    const state = useAppState();
    const { agentRef } = useAppRef();









    return (
        <header className="bg-linear-to-r from-blue-700 to-indigo-800 p-1 text-white flex items-center justify-between shadow-lg">
            <AgentName agentName={state.agentName} />
            <div className="flex items-center gap-6">
                <StatusDuration />
                <StatusDropdown
                    currentStatus={state.currentStatus}
                    availableStatuses={state.availableStatus}
                    agentRef={agentRef}
                    state={state}
                />
                <SettingsButton />
            </div>
        </header>
    )
}