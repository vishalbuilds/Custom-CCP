import { CCP_CONFIG } from "../../ccpConfig";

/**
Change agent status in remote and in state.
 * @param {function} state - context function to get set
 * @param {function} dispatch - context function to set state value 
 * @param {string} targetStatus - target status to set in remote
*/
export function changeStatus(state, dispatch, targetStatus) {
  const agent = new connect.Agent();
  const targetState = state.agentConfig.agentStates.find(
    (agentState) => agentState.type === targetStatus,
  );

  if (targetState) {
    agent.setState(targetState, {
      success: () => dispatch({ type: "CURRENT_STATUS", payload: targetState }),
      failure: (err) => console.error("Failed to change status:", err),
    });
  } else {
    console.error("Status not found:", targetStatus);
  }
}

/**
 Download ccp Ephemeral logs
 */
export function downloadCCPLogs() {
  try {
    connect.getLog().download();
  } catch (error) {
    console.error("Error downloading logs:", error);
  }
}

/**
 Sign out function 
 */
export function ccpSignOut() {
  const agent = new connect.Agent();
  if (agent.getAvailabilityState().type === connect.AgentStatusType.OFFLINE) {
    signOut();
  } else {
    setAgentOffline().then(signOut).catch(console.error);
  }
}

function setAgentOffline() {
  return new Promise((resolve, reject) => {
    const agent = new connect.Agent();
    const offlineState = agent
      .getAgentStates()
      .find((state) => state.type === connect.AgentStateType.OFFLINE);
    agent.setState(
      offlineState,
      {
        success: resolve,
        failure: reject,
      },
      { enqueueNextState: true },
    );
  });
}

function signOut() {
  const logoutEndpoint = `${CCP_CONFIG.ccp_domain}/logout`;
  fetch(logoutEndpoint, { credentials: "include", mode: "no-cors" }).then(
    () => {
      connect.core.getUpstream().sendUpstream(connect.EventType.TERMINATE);
    },
  );
}

/**
 softphone enable
 */

export function SoftphoneDeskPhoneHandler(newConfigObj) {
  const config = connect.agent.getConfiguration();
  const newConfig = {
    ...config,
    ...newConfigObj,
  };

  agent.setConfiguration(newConfig, {
    success: () => console.log("Updated agent configuration"),
    failure: () => console.log("Failed to update agent configuration"),
  });
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

// // export function statusDuration(agentRef) {
// //   return agentRef.current.getStateDuration();
// // }
