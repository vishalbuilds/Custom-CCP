import ConnectCCP from "./components/ccp/ConnectCCP.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import LoadingPortal from "./components/modal/LoadingPortal.jsx";
import { useAppRef } from "./context/ProviderCtx";

function App() {
  const { agentRef } = useAppRef();

  return (
    <>
      <ConnectCCP />
      <LoadingPortal agentRef={agentRef} />
      {agentRef && (
        <>
          <Header />
          <h1>Amazon Connect CCP - Agent State:</h1>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
