import { Wifi, Volume2 } from "lucide-react";
import pkg from '../../../package.json'
import { CCP_CONFIG } from "../../ccpConfig";


export default function Footer() {
    return (<footer className="bg-slate-100 border-t px-6 py-3 flex items-center justify-between text-slate-500 text-xs font-medium">
        <div className="flex gap-6">
            <div className="flex items-center gap-2">
                <Wifi size={14} className="text-green-500" /> Latency: 24ms
            </div>
            <div className="flex items-center gap-2">
                <Volume2 size={14} className="text-blue-500" /> Audio: Good
            </div>
        </div>
        <div className="opacity-50">CCP v{pkg.version} • Region: {CCP_CONFIG.region}</div>
    </footer>)
}