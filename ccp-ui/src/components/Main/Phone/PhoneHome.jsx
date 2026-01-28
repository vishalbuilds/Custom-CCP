import Connected from "./Connected.jsx"
import Dialpad from "./Dialpad.jsx"
import Incoming from "./Incoming.jsx"
import QuickConnects from "./QuickConnects.jsx"
import Disconnected from "./Disconnected.jsx"
import Phone from "./Phone.jsx"
import Missed from "./Missed.jsx"

import useCTX from "../../../context/ProviderCtx.jsx"



export default function PhoneHome() {


    const { state } = useCTX();

    return (
        <>
            {state.phoneStatus === "noCall" && state.phoneHome == "phoneHome" && <Phone />}
            {state.phoneHome == "qc" && <QuickConnects />}
            {state.phoneStatus === "noCall" && state.phoneHome === "dialpad" && <Dialpad />}
            {state.phoneStatus == "incoming" && state.phoneHome == "phoneHome" && <Incoming />}
            {state.phoneStatus == "connected" && state.phoneHome == "phoneHome" && <Connected />}
            {state.phoneStatus == "disconnected" && state.phoneHome == "phoneHome" && <Disconnected />}
            {state.phoneStatus == "missed" && state.phoneHome == "phoneHome" && <Missed />}
        </>
    );

}
