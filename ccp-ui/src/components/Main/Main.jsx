import Nav from "./Navigation/Nav";
import { useAppState } from "../../context/ProviderCtx";
import Home from "./Home";
import Chat from "./Chat";
import Phone from "./Phone/Phone.jsx";

export default function Main() {
    const state = useAppState();



    return (
        <div className="flex flex-1 min-h-0">
            <Nav />
            <main className="flex-1 flex flex-col bg-white" >
                {state.navigation === "home" && <Home agentName={state.agentName} />}
                {state.navigation === "phone" && <Phone />}
                {state.navigation === "chat" && <Chat />}
            </main>
        </div>)
}