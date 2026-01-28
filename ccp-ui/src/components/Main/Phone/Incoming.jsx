import { Phone, PhoneOff } from "lucide-react";

export default function Incoming({ contactName, contactNumber, onAnswer, onDecline }) {
    return (
        <div className="flex flex-col items-center py-10">
            <h3 className="text-5xl font-mono font-bold text-blue-600 mt-15 mb-10">
                {contactNumber}
            </h3>
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 animate-pulse">
                <Phone size={40} />
            </div>
            <p className="font-semibold text-2xl text-blue-600 mb-10">incoming</p>

            <div className="flex gap-6 mt-12">
                <button
                    onClick={onAnswer}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl w-24 bg-green-600 text-white hover:bg-green-300 shadow-xl shadow-green-200 transition-all"
                >
                    <Phone />
                    <span className="text-xs font-bold">ANSWER</span>
                </button>
                <button
                    onClick={onDecline}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl w-24 bg-red-600 text-white hover:bg-red-300 shadow-xl shadow-red-200 transition-all"
                >
                    <PhoneOff />
                    <span className="text-xs font-bold">DECLINE</span>
                </button>
            </div>
        </div>
    );
}