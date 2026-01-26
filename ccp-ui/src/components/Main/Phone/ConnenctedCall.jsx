export default function Connected() {
    return (
        <div className="flex flex-col items-center py-10">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 animate-pulse">
                <Phone size={40} />
            </div>
            <h3 className="text-2xl font-bold">{contactName}</h3>
            <p className="text-slate-500">{contactNumber}</p>
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
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl w-24 bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-200 transition-all"
                >
                    <PhoneOff />{" "}
                    <span className="text-xs font-bold">END</span>
                </button>
            </div>
        </div>
    )
}