
import { Settings, ExternalLink, Download, LogOut } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { downloadCCPLogs, ccpSignOut } from './headerHandler.js'
import useCTX from "../../context/ProviderCtx.jsx";

export default function SettingsButton() {

    const { agentRef, state, dispatch } = useCTX();

    const settingsButtonRef = useRef(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);




    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingsButtonRef.current && !settingsButtonRef.current.contains(event.target)) {
                setIsSettingsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block" ref={settingsButtonRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-1 rounded-xl transition-all min-w-5"
            >
                <Settings size={22} className={`ml-auto text-white transition-transform ${isSettingsOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {
                isSettingsOpen && (
                    <div className="absolute right-0 mt-3 w-45 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-120 animate-in fade-in slide-in-from-top-2">
                        <div className="py-1">

                            {/* Option One */}
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-50   text-slate-600"
                                onClick={() => window.open("https://tools.connect.aws/endpoint-test/", "_blank", "noreferrer")}>
                                <div className="flex items-center gap-3">
                                    <ExternalLink size={18} />
                                    <span>Endpoint Test</span>
                                </div>
                                {/* <ProfileComponent /> */}
                            </button>

                            {/* Option Two */}
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-50   text-slate-600"
                                onClick={() => { downloadCCPLogs() }}>
                                <div className="flex items-center gap-3">
                                    <Download size={18} />
                                    <span>Download Logs</span>
                                </div>
                                {/* <NotificationComponent /> */}
                            </button>

                            {/* Option Three */}
                            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5"
                                onClick={() => { ccpSignOut(agentRef, state); dispatch({ type: 'CCP_SIGNOUT' }); }}>
                                <LogOut size={18} />
                                <span>Sign Out</span>
                            </button>

                        </div>
                    </div>
                )
            }
        </div >
    )
}