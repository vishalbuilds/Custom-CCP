import { Settings, ExternalLink, Download, LogOut, Headphones, HeadphoneOff, ToggleLeft, ToggleRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { downloadCCPLogs, ccpSignOut, SoftphoneDeskPhoneHandler } from './headerHandler.js'
import useCTX from "../../context/ProviderCtx.jsx";
import { isValidPhoneNumber } from 'libphonenumber-js/min'

export default function SettingsButton() {
    const { state, dispatch } = useCTX();
    const settingsButtonRef = useRef(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [phoneNumbers, setPhoneNumbers] = useState(state.agentConfig.extension || '');
    const [isDeskPhoneEnabled, setIsDeskPhoneEnabled] = useState(false);



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingsButtonRef.current && !settingsButtonRef.current.contains(event.target)) {
                setIsSettingsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Handle phone configuration changes
    useEffect(() => {
        if (isValidPhoneNumber(String(phoneNumbers))) {
            const newConfigObj = {
                extension: phoneNumbers
            }
            SoftphoneDeskPhoneHandler(dispatch, newConfigObj)

        } else if (phoneNumbers === '') {
            const newConfigObj = {
                softphoneEnabled: true,
            }
            SoftphoneDeskPhoneHandler(dispatch, newConfigObj)
        }
    }, [phoneNumbers])



    useEffect(() => {
        if (isDeskPhoneEnabled && phoneNumbers) {
            const newConfigObj = {
                softphoneEnabled: false,
            }
            SoftphoneDeskPhoneHandler(dispatch, newConfigObj)

        } else if (!isDeskPhoneEnabled) {
            const newConfigObj = {
                softphoneEnabled: true,
            }
            SoftphoneDeskPhoneHandler(dispatch, newConfigObj)
        }
    }, [isDeskPhoneEnabled, phoneNumbers])



    return (
        <div className="relative" ref={settingsButtonRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-1 rounded-xl transition-all min-w-5"
            >
                <Settings size={20} />
            </button>

            {/* Dropdown Menu */}
            {isSettingsOpen && (
                <div className="absolute right-0 top-full mt-2 w-50 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50">
                    {/* open endpoint utility url */}
                    <button
                        onClick={() => window.open("https://tools.connect.aws/endpoint-test/", "_blank", "noreferrer")}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-slate-700"
                    >
                        <ExternalLink size={18} className='text-blue-700' />
                        <span>Endpoint Test</span>
                    </button>

                    {/* SoftPhone enable */}
                    <button
                        onClick={() =>
                            setOpen((prev) => !prev)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-slate-700 transition-colors ${isDeskPhoneEnabled ? 'bg-red-200 hover:bg-red-100' : ' hover:bg-slate-50'
                            }`}
                    >
                        {!isDeskPhoneEnabled ? (
                            <Headphones size={18} className="text-blue-600" />
                        ) : (
                            <HeadphoneOff size={18} />
                        )}
                        <span className="flex-1 text-left">SoftPhone</span>

                    </button>

                    {/* DeskPhone number config */}
                    {open && (
                        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                            <div className="flex items-center gap-2">
                                <input
                                    type="tel"
                                    placeholder="Desk Phone Number"
                                    value={phoneNumbers}
                                    onChange={(e) => setPhoneNumbers(e.target.value)}
                                    className="flex-1 p-2 bg-white border w-30 border-slate-200 rounded-lg  transition-all text-slate-700 text-sm"
                                />
                                <button
                                    onClick={() => setIsDeskPhoneEnabled(pre => !pre)}
                                    className="shrink-0"
                                >
                                    {isDeskPhoneEnabled ? (
                                        <ToggleRight size={24} className="text-red-400" />
                                    ) : (
                                        <ToggleLeft size={24} className="text-blue-600" />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* download ccp logs */}
                    <button
                        onClick={() => downloadCCPLogs()}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-slate-700"
                    >
                        <Download size={18} />
                        <span>Download Logs</span>
                    </button>

                    {/* signout */}
                    <button
                        onClick={() => {
                            ccpSignOut(state);
                            dispatch({ type: 'CCP_STATUS', payload: 'signout' });
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 border-t border-slate-200"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            )}

        </div>
    )
}