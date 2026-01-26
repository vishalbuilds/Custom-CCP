import Connected from "./ConnenctedCall.jsx"
import Dialpad from "./Dialpad.jsx"
import IncomingCall from "./IncomingCall.jsx"
import QuickConnects from "./QuickConnects.jsx"
import DisconnectedCall from "./DisconnectedCall.jsx"
import PhoneHome from "./PhoneHome.jsx"

import { useAppState } from "../../../context/ProviderCtx.jsx"



export default function Phone() {
    const state = useAppState();



    return (
        <>
            {state.phoneTab == "phoneHome" && <PhoneHome />}
            {state.phoneTab == "qc" && <QuickConnects />}
            {state.phoneTab == "dialpad" && <Dialpad />}
            {state.phoneTab == "incoming" && <IncomingCall />}
            {state.phoneTab == "outgoing" && <Connected />}
            {state.phoneTab == "missed" && <DisconnectedCall />}
        </>
    );

}
