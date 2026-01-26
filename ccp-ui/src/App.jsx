import ConnectCCP from "./components/ccp/ConnectCCP.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import LoadingPortal from "./components/modal/LoadingPortal.jsx";
import useCTX from "./context/ProviderCtx";
import SignOutPortal from "./components/modal/SignOutPortal.jsx";



function App() {
  const { agentRef, state } = useCTX();


  return (
    <div className="min-h-screen flex flex-col">
      {!state.signOut && <ConnectCCP />}
      <LoadingPortal agentRef={agentRef} />
      {state.signOut ? <SignOutPortal /> :
        (agentRef && (
          <>
            <Header />
            <Main className="flex-1" />
            <Footer />
          </>
        ))}
    </div>
  );
}

export default App;
