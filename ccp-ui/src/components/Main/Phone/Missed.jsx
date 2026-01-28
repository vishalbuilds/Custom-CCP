import { PhoneMissed, X } from "lucide-react";

export default function Missed({ contactName, contactNumber, onDismiss }) {
    return (
        <div className="flex flex-col items-center py-10 relative">
            {onDismiss && (
                <button
                    onClick={onDismiss}
                    className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-all"
                >
                    <X className="w-5 h-5 text-slate-600" />
                </button>
            )}

            <h3 className="text-5xl font-mono font-bold text-red-600 mt-15 mb-10">
                {contactNumber}
            </h3>
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white mb-6 animate-pulse">
                <PhoneMissed size={40} />
            </div>
            <p className="font-semibold text-2xl text-red-600 mb-10">missed call</p>
        </div>
    );
}