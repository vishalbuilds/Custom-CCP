import { useEffect } from "react";
import initConnectCCP from "./initConnectCCP/initConnectCCP.js";

function App() {
  useEffect(() => {
    initConnectCCP();
    
    // Cleanup function to reset initialization flag and remove iframes
    return () => {
      // Remove any existing iframes
      const existingIframes = document.querySelectorAll('iframe[src*="connect.aws"]');
      existingIframes.forEach(iframe => {
        iframe.remove();
      });
      
      // Clear the container
      const container = document.getElementById("ccp-container");
      if (container) {
        container.innerHTML = '';
      }
      
      window.ccpInitialized = false;
    };
  }, []);

  return (
    <div>
      <h1>Amazon Connect CCP</h1>
      <div id="ccp-container" style={{ width: '400px', height: '600px', display: "none"  }}></div>
    </div>
  );
}

export default App;
