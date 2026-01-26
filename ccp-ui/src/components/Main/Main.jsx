import Nav from "./Navigation/Nav";
import useCTX from "../../context/ProviderCtx";
import AgentHome from "./AgentHome.jsx";
import Chat from "./Chat";
import Phone from "./Phone/Phone.jsx";

export default function Main() {
    const { state } = useCTX();



    return (
        <div className="flex flex-1 min-h-0">
            <Nav />
            <main className="flex-1 flex flex-col bg-white" >
                {state.navigation === "home" && <AgentHome agentName={state.agentName} />}
                {state.navigation === "phone" && <Phone />}
                {state.navigation === "chat" && <Chat />}
            </main>
        </div>)
}