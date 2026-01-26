import Connected from "./ConnenctedCall.jsx"
import Dialpad from "./Dialpad.jsx"
import IncomingCall from "./IncomingCall.jsx"
import QuickConnects from "./QuickConnects.jsx"
import DisconnectedCall from "./DisconnectedCall.jsx"
import PhoneHome from "./PhoneHome.jsx"

import useCTX from "../../../context/ProviderCtx.jsx"



export default function Phone() {
    const { state } = useCTX();

    return (
        <>
            {state.phoneTab == "phoneHome" && state.phoneStatus === "noCall" && <PhoneHome />}
            {state.phoneTab == "qc" && <QuickConnects />}
            {state.phoneTab == "dialpad" && state.phoneStatus === "noCall" && <Dialpad />}
            {state.phoneTab == "phoneHome" && state.phoneStaus == "incoming" && <IncomingCall />}
            {state.phoneTab == "phoneHome" && state.phoneStaus == "outgoing" && <Connected />}
            {state.phoneTab == "phoneHome" && state.phoneStaus == "missed" && <DisconnectedCall />}
        </>
    );

}
