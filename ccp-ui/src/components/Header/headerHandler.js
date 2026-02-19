import { CCP_CONFIG } from "../../ccpConfig";

/**
 * Change agent status in remote and in state.
 * @param {Object} state - context function to get set
 * @param {Function} dispatch - context function to set state value
 * @param {string} targetStatus - target status to set in remote
 */
export function changeStatus(state, dispatch, targetStatus) {
  const agent = new window.connect.Agent();
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
 * Download ccp Ephemeral logs
 */
export function downloadCCPLogs() {
  try {
    window.connect.getLog().download();
  } catch (error) {
    console.error("Error downloading logs:", error);
  }
}

/**
 * Sign out function
 */
export function ccpSignOut() {
  const agent = new window.connect.Agent();
  if (
    agent.getAvailabilityState().type === window.connect.AgentStatusType.OFFLINE
  ) {
    signOut();
  } else {
    setAgentOffline().then(signOut).catch(console.error);
  }
}

function setAgentOffline() {
  return new Promise((resolve, reject) => {
    const agent = new window.connect.Agent();
    const offlineState = agent
      .getAgentStates()
      .find((state) => state.type === window.connect.AgentStateType.OFFLINE);
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
      window.connect.core
        .getUpstream()
        .sendUpstream(window.connect.EventType.TERMINATE);
    },
  );
}

/**
 * Configure softphone/deskphone settings
 * @param {Object} state - Current application state
 * @param {Function} dispatch - State dispatch function
 * @param {Object} newConfigObj - New configuration object
 */
export function SoftphoneDeskPhoneHandler(dispatch, newConfigObj) {
  try {
    let config = {};
    window.connect.agent((agent) => {
      config = agent.getConfiguration();
    });

    const agent = new window.connect.Agent();

    const newConfig = {
      ...config,
      ...newConfigObj,
    };

    agent.setConfiguration(newConfig, {
      success: () => {
        // Update local state to reflect the change
        dispatch({
          type: "AGENT_CONFIG",
          payload: newConfig,
        });
      },
      failure: (error) => {
        console.error("Failed to update agent configuration:", error);
        // You might want to show an error message to the user here
      },
    });
  } catch (error) {
    console.error("Error in SoftphoneDeskPhoneHandler:", error);
  }
}
