import { CCP_CONFIG } from "../../ccpConfig";

export function changeStatus(targetStatus, agentRef, state) {
  if (state.availableStatus.includes(targetStatus)) {
    agentRef.current.setState(targetStatus, {
      success: () => console.log("Status changed to:", statusName),
      failure: (err) => console.error("Failed to change status:", err),
    });
  } else {
    console.error("Status not found:", statusName);
  }
}

export function downloadCCPLogs() {
  try {
    console.log("Downloading logs...");
    connect.getLog().download();
    console.log("Logs downloaded successfully.");
  } catch (error) {
    console.error("Error downloading logs:", error);
  }
}

export function ccpSignOut(agentRef, state) {
  if (state.currentStatus === "Offline") {
    signOut();
  } else {
    changeStatus("Offline", agentRef, state).then(signOut).catch(console.error);
  }
}

function signOut() {
  const logoutEndpoint = `${CCP_CONFIG.ccp_domain}/logout`;
  fetch(logoutEndpoint, { credentials: "include", mode: "no-cors" }).then(
    () => {
      connect.core.getUpstream().sendUpstream(connect.EventType.TERMINATE);
    },
  );
}

// //agent status duration timers
// function statusDuration(state) {
//   totalMs = agentRef.current.getStateDuration();
//   const totalSecs = Math.floor(totalMs / 1000);

//   const hrs = Math.floor(totalSecs / 3600);
//   const mins = Math.floor((totalSecs % 3600) / 60);
//   const secs = totalSecs % 60;

//   return `${hrs.toString().padStart(2, "0")}:${mins
//     .toString()
//     .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
// }

// export function formatTime(totalMs) {
//   const hrs = Math.floor(totalMs / 3600000);
//   const mins = Math.floor((totalMs % 3600000) / 60000);
//   const secs = Math.floor((totalMs % 60000) / 1000);
//   const ms = totalMs % 1000;

//   return `${hrs.toString().padStart(2, "0")}:${mins
//     .toString()
//     .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
// }

// export function statusDuration(agentRef) {
//   return agentRef.current.getStateDuration();
// }
