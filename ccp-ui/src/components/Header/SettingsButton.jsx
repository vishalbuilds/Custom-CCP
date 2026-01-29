
import { Settings, ExternalLink, Download, LogOut, Smartphone, Headphones, HeadphoneOff } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { downloadCCPLogs, ccpSignOut, SoftphoneDeskPhoneHandler } from './headerHandler.js'
import useCTX from "../../context/ProviderCtx.jsx";
import { isValidPhoneNumber } from 'libphonenumber-js/min'

export default function SettingsButton() {

    const { state, dispatch } = useCTX();

    const settingsButtonRef = useRef(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [deskPhone, setDeskPhone] = useState(false);
    const [phoneNumbers, setPhoneNumbers] = useState();





    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingsButtonRef.current && !settingsButtonRef.current.contains(event.target)) {
                setIsSettingsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])


    useEffect(() => {
        if (deskPhone && isValidPhoneNumber(phoneNumbers)) {
            newConfigObj = { softphoneEnabled: false, extension: phoneNumbers, }
            SoftphoneDeskPhoneHandler(state, dispatch, newConfigObj)

        }
    }, [phoneNumbers])


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

                            {/*  open endpoint utility url */}
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-50   text-slate-600"
                                onClick={() => window.open("https://tools.connect.aws/endpoint-test/", "_blank", "noreferrer")}>
                                <div className="flex items-center gap-3">
                                    <ExternalLink size={18} />
                                    <span>Endpoint Test</span>
                                </div>
                            </button>




                            {/* SoftPhone enable */}
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-50   text-slate-600"
                                onClick={() => { setDeskPhone((prev) => !prev) }}>

                                {deskPhone ? <HeadphoneOff size={18} /> : <Headphones size={18} />}
                                <span>SoftPhone</span>
                            </button>


                            {/* deskPhone details
                            {deskPhone && <button className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-50   text-slate-600"
                                onClick={() => { }}>
                                <Smartphone size={18} />
                                <span>DeskPhone</span>
                            </button>} */}

                            {/* deskPhone details */}
                            {deskPhone && <input
                                type='number'
                                max='15'
                                min='5'
                                placeholder="Phone number..."
                                value={phoneNumbers}
                                onChange={(e) => setPhoneNumbers(e.target.value)}
                                className="w-40 flex items-center gap-3 p-1 m-2  bg-white border border-slate-200 rounded-xl  focus:ring-blue-500 focus:border-transparent transition-all text-slate-700"
                            />}






                            {/*  download ccp logs */}
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-50   text-slate-600"
                                onClick={() => { downloadCCPLogs() }}>
                                <div className="flex items-center gap-3">
                                    <Download size={18} />
                                    <span>Download Logs</span>
                                </div>
                            </button>

                            {/* signout */}
                            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5"
                                onClick={() => { ccpSignOut(state); dispatch({ type: 'CCP_STATUS', payload: 'signout' }); }}>
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