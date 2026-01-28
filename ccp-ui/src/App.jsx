import ConnectCCP from "./components/ccp/ConnectCCP.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import useCTX from "./context/ProviderCtx";
import Modal from "./components/modal/Modal.jsx";



function App() {
  const { state } = useCTX();


  return (
    <>
      {state.ccpStatus !== 'signout' && <ConnectCCP />}
      {state.ccpStatus !== 'initialised' ? <Modal /> :
        <div className="min-h-screen flex flex-col">
          <Header />
          <Main className="flex-1" />
          <Footer />
        </div >
      }
    </>
  );
}

export default App;
