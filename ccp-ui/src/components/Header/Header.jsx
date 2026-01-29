
import StatusDuration from './StatusDuration.jsx';
import AgentName from './AgentName.jsx';
import StatusDropdown from './StatusDropdown.jsx';
import SettingsButton from './SettingsButton.jsx';





export default function Header() {

    return (
        <header className="bg-linear-to-r from-blue-700 to-indigo-800 p-1 text-white flex items-center justify-between shadow-lg">
            <AgentName />
            <div className="flex items-center gap-6">
                <StatusDuration />
                <StatusDropdown />
                <SettingsButton />

            </div>
        </header>
    )
}

