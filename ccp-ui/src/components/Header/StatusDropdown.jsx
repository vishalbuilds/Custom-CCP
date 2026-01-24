import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function StatusDropdown({ currentStatus, availableStatuses, dropdownRef }) {

    const [isStatusOpen, setIsStatusOpen] = useState(false);


    const formatLabel = (status) => {
        // Handle both string and object cases
        const statusName = typeof status === 'string' ? status : status?.name || status?.type || 'Unknown';
        return statusName.charAt(0).toUpperCase() + statusName.slice(1);
    };
    return (<div id='status-dropdown' className="relative" ref={dropdownRef}>
        <button
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl transition-all min-w-[150px]"
        >
            <span className="font-semibold text-white">
                {currentStatus ? formatLabel(currentStatus) : "Select Status"}
            </span>
            <ChevronDown
                size={16}
                className={`ml-auto text-white transition-transform ${isStatusOpen ? "rotate-180" : ""}`}
            />
        </button>

        {isStatusOpen && (
            <div className="absolute right-0 mt-3 w-37 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-[120] animate-in fade-in slide-in-from-top-2">
                <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase">
                    Set Your Status
                </p>

                {availableStatuses.map((targetStatus) => (
                    <button
                        key={targetStatus?.name || targetStatus?.type || targetStatus}
                        onClick={() => {
                            headerHandler.changeStatus(targetStatus, agentRef, state)
                            setIsStatusOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-50 
                                ${(currentStatus?.name || currentStatus) === (targetStatus?.name || targetStatus?.type || targetStatus) ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600"}`}
                    >
                        {/* Only the label with first letter capitalized */}
                        {formatLabel(targetStatus)}
                    </button>
                ))}
            </div>
        )}
    </div>)
}