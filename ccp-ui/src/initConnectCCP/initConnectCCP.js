const connectConfig = {
  ccpUrl: "https://vishaltesting-aws-connect.my.connect.aws/ccp-v2/",
  loginPopup: true,
  loginPopupAutoClose: true,
  region: "eu-central-1",
  softphone: {
    allowFramedSoftphone: true,
 },

  // loginUrl: "https://vishaltesting-aws-connect.my.connect.aws/login",

};

function initializeCCP() {
  if (!window.connect) {  
    console.error("Amazon Connect Streams library not loaded");
    return;
  }
  
  const container = document.getElementById("ccp-container");
  if (!container) {
    console.error("CCP container not found");
    return;
  }

  try {
    // Use the standard initialization method
    window.connect.core.initCCP(container, connectConfig);
    
    // Set up event handlers
    window.connect.core.onInitialized(() => {
      console.log("CCP initialized successfully");
    });

    window.connect.core.onAuthorizeSuccess(() => {
      console.log("Authorization successful");
    });
    
    window.connect.core.onAuthorizeFail(() => {
      console.error("Authorization failed");
    });
    
  } catch (error) {
    console.error("Error initializing CCP:", error);
  }
}

export default function initConnectCCP() {
  const existingScript = document.querySelector('script[src*="amazon-connect-streams"]');
  
  if (window.connect) {
    console.log("Amazon Connect Streams already loaded");
    initializeCCP();
    return;
  }
  
  if (existingScript) {
    console.log("Amazon Connect Streams script loading...");
    existingScript.addEventListener('load', initializeCCP);
    return;
  }

  console.log("Loading Amazon Connect Streams library");
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/amazon-connect-streams/release/connect-streams-min.js";
  script.async = true;
  
  script.addEventListener('load', initializeCCP);
  script.addEventListener('error', () => {
    console.error("Failed to load Connect Streams library");
  });

  document.head.appendChild(script);
}