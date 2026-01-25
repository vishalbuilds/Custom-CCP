import ConnectCCP from "./components/ccp/ConnectCCP.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import LoadingPortal from "./components/modal/LoadingPortal.jsx";
import { useAppRef, useAppState } from "./context/ProviderCtx";
import SignOutPortal from "./components/modal/SignOutPortal.jsx";


function App() {
  const { agentRef } = useAppRef();
  const state = useAppState();





  return (
    <div className="min-h-screen flex flex-col">
      <ConnectCCP />
      <LoadingPortal agentRef={agentRef} />
      {state.signOut ? <SignOutPortal /> :
        (agentRef && (
          <>
            <Header />
            <h1 className="flex-1">Amazon Connect CCP - Agent State:</h1>
            <Footer />
          </>
        ))}
    </div>
  );
}

export default App;
