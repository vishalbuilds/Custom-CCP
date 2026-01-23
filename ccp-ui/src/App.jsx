import { useMemo, useState, useEffect } from "react";
import ConnectCCP from "./components/ConnectCCP.jsx";
import { Provider } from "./context/hooksContext.jsx";

function App() {



  return (
    <Provider>
      <ConnectCCP />
      <h1>Amazon Connect CCP - Agent State: </h1>
    </Provider>
  );
}

export default App;