import { useState } from "react";
import { Phone, X, ArrowLeft } from "lucide-react";
import { useAppDispatch } from "../../../context/ProviderCtx.jsx";


export default function Dialpad() {
    const [phoneInput, setPhoneInput] = useState("");
    const dispatch = useAppDispatch();

    return (
        <div className="flex-1 flex flex-col p-6">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => dispatch({ type: "PHONE_HOME" })}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>
            </div>
            
            <div className="max-w-xs mx-auto">
                <div className="bg-slate-100 p-4 rounded-2xl mb-6 flex items-center">
                    <input
                        value={phoneInput}
                        readOnly
                        className="bg-transparent text-2xl font-mono w-full text-center outline-none placeholder:text-slate-300"
                        placeholder="000-000-0000"
                    />
                    {phoneInput && (
                        <button
                            onClick={() => setPhoneInput("")}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "*",
                        "0",
                        "#",
                    ].map((num) => (
                        <button
                            key={num}
                            onClick={() => setPhoneInput((prev) => prev + num)}
                            className="h-16 rounded-2xl bg-white border border-slate-200 text-xl font-bold hover:bg-blue-50 hover:border-blue-200 transition-all"
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => startCall("Outbound Call", phoneInput)}
                    disabled={!phoneInput}
                    className="w-full mt-6 py-4 bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-50 transition-all shadow-lg shadow-green-100"
                >
                    <Phone size={20} /> DIAL NUMBER
                </button>
            </div>
        </div>
    )
}