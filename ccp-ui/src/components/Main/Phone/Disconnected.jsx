import { PhoneOff } from "lucide-react";

export default function Disconnected({ contactName, contactNumber }) {
    return (
        <div className="flex flex-col items-center py-10">
            <h3 className="text-5xl font-mono font-bold text-slate-600 mt-15 mb-10">
                {contactNumber}
            </h3>
            <div className="w-24 h-24 bg-slate-600 rounded-full flex items-center justify-center text-white mb-6 animate-pulse">
                <PhoneOff size={40} />
            </div>
            <p className="font-semibold text-2xl text-slate-600 mb-10">disconnecting</p>
        </div>
    );
}