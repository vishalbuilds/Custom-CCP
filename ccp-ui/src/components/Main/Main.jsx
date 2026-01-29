import Nav from "./Navigation/Nav";
import useCTX from "../../context/ProviderCtx";
import AgentHome from "./AgentHome.jsx";
import ChatHome from "./chat/ChatHome.jsx";
import PhoneHome from "./Phone/PhoneHome.jsx";

export default function Main() {
    const { state } = useCTX();

    return (
        <div className="flex flex-1 min-h-0">
            <Nav />
            <main className="flex-1 flex flex-col bg-white" >
                {state.navigation === "home" && <AgentHome agentName={state.agentConfig.firstName} />}
                {state.navigation === "phoneHome" && <PhoneHome />}
                {state.navigation === "chatHome" && <ChatHome />}

            </main>
        </div>)
}