import { Home, PhoneCall, MessageSquare } from "lucide-react";
import useCTX from "../../../context/ProviderCtx.jsx";

export default function Nav() {
    const { state, dispatch } = useCTX();

    const button = (tab, Icon) => (
        <button
            onClick={() => dispatch({ type: "NAVIGATION", payload: tab })}
            className={`p-4 rounded-xs transition-all
        ${state.navigation === tab
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "text-slate-400 hover:bg-slate-200"
                }`}
        >
            <Icon size={20} />
        </button>
    );

    return (
        <nav className="bg-blue-50 rounded-r-lg flex flex-col items-center py-6 gap-3">
            {button("home", Home)}
            {button("phone", PhoneCall)}
            {button("chat", MessageSquare)}

        </nav>
    );
}
