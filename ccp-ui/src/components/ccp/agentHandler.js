export function agentHandler(dispatch) {
  //Get agent name
  const agentName = agentHook.getName();
  dispatch({ type: "AGENT_NAME", payload: agentName });

  // Get available agent states
  const states = agentHook.getAgentStates();
  dispatch({ type: "AVAILABLE_STATES", payload: states });

  // Subscribe to agent state changes to automatically update currentStatus
  agentHook.onStateChange((agentStateChange) => {
    const newState = agentStateChange.newState;
    console.log("Agent state changed to:", newState);
    dispatch({ type: "CURRENT_STATE", payload: newState });
  });
}
