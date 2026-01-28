import { useState, useEffect } from "react";
import {
    PhoneForwarded,
    Phone,
    PhoneOff,
    Mic,
    MicOff,
    Pause,
    Play,
} from "lucide-react";

export default function Connected() {


    // --- Call Logic State ---
    const [callStatus, setCallStatus] = useState("available"); // available, connected, busy, offline, lunch, meeting
    const [isMuted, setIsMuted] = useState(false);
    const [isHolding, setIsHolding] = useState(false);
    const [callDuration, setCallDuration] = useState("00:00");
    const [timerInterval, setTimerInterval] = useState(null);

    // --- Input & History State ---
    const [phoneInput, setPhoneInput] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [callHistory, setCallHistory] = useState([]);
    const [isACW, setIsACW] = useState(false);
    const [statusSeconds, setStatusSeconds] = useState(0);



    // --- Effect: Status Timer ---
    useEffect(() => {
        setStatusSeconds(0);
        const interval = setInterval(() => {
            setStatusSeconds((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [callStatus]);

    // --- Effect: Outside Click for Dropdown ---
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setIsStatusOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --- Call Functions ---
    const startCall = (name, number) => {
        setCallStatus("connected");
        setContactName(name);
        setContactNumber(number);
        setPhoneInput("");

        let seconds = 0;
        const interval = setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            setCallDuration(
                `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`,
            );
        }, 1000);
        setTimerInterval(interval);
    };

    const endCall = () => {
        if (timerInterval) clearInterval(timerInterval);

        const entry = {
            name: contactName || "Manual Dial",
            number: contactNumber || phoneInput,
            duration: callDuration,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
        setCallHistory((prev) => [entry, ...prev].slice(0, 5));

        setCallStatus("busy");
        setIsACW(true);

        setTimeout(() => {
            setIsACW(false);
            setCallStatus("available");
            setCallDuration("00:00");
            setContactName("");
            setContactNumber("");
        }, 5000);
    };



    return (
        <div className="flex flex-col items-center py-10 ">
            <h3 className="text-5xl font-mono font-bold text-blue-600 m mt-15 mb-10">+15551000001</h3>
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 animate-pulse">
                <Phone size={40} />
            </div>
            <p className="font-semibold text-2xl text-blue-600 mb-10">incoming</p>

            <p className="text-4xl font-mono font-bold text-blue-600 mt-6">
                {callDuration}
            </p>


            <div className="flex gap-6 mt-12">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl w-24 transition-all ${isMuted ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                    {isMuted ? <MicOff /> : <Mic />}{" "}
                    <span className="text-xs font-bold">MUTE</span>
                </button>
                <button
                    onClick={() => setIsHolding(!isHolding)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl w-24 transition-all ${isHolding ? "bg-orange-50 text-orange-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                    {isHolding ? <Play /> : <Pause />}{" "}
                    <span className="text-xs font-bold">
                        {isHolding ? "RESUME" : "HOLD"}
                    </span>
                </button>
                <button
                    onClick={endCall}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl w-24 bg-red-600 text-white hover:bg-red-300 shadow-xl shadow-red-200 transition-all"
                >
                    <PhoneOff />{" "}
                    <span className="text-xs font-bold">END</span>
                </button>
                <button
                    onClick={endCall}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl w-24 bg-blue-600 text-white hover:bg-blue-300 shadow-xl shadow-red-200 transition-all"
                >
                    <PhoneForwarded />{" "}
                    <span className="text-xs font-bold">QC</span>
                </button>
            </div>
        </div>
    )
}