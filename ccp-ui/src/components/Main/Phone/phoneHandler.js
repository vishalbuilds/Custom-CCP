export function getQuickConnects(agentRef, onSuccess) {
  const defaultOutboundQueueARN =
    agentRef.current.getRoutingProfile().defaultOutboundQueue.queueARN;

  const routingProfileQueueARNs = agentRef.current.getAllQueueARNs();

  agentRef.current.getEndpoints(
    routingProfileQueueARNs.concat(defaultOutboundQueueARN),
    {
      success: ({ endpoints }) => {
        onSuccess?.(endpoints);
      },
      failure: (err) => {
        console.error("Failed to retrieve quick connects", err);
      },
    },
  );
}

export function StartQuickConnectCall(endpoint, agentRef) {
  return new Promise((resolve, reject) => {
    agentRef.current.connect(endpoint, {
      success: () => {
        console.log(`Started call with endpoint: ${endpoint}`);
        resolve();
      },
      failure: () => {
        console.log(`Failed to start outbound call: ${endpoint.name}`);
        reject();
      },
    });
  });
}
