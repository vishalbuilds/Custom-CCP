export function getQuickConnects(onSuccess) {
  const agent = new connect.Agent();
  const defaultOutboundQueueARN =
    agent.getRoutingProfile().defaultOutboundQueue.queueARN;

  const routingProfileQueueARNs = agent.getAllQueueARNs();

  agent.getEndpoints(routingProfileQueueARNs.concat(defaultOutboundQueueARN), {
    success: ({ endpoints }) => {
      onSuccess?.(endpoints);
    },
    failure: (err) => {
      console.error("Failed to retrieve quick connects", err);
    },
  });
}

export function StartQuickConnectCall(endpoint) {
  const agent = new connect.Agent();
  return new Promise((resolve, reject) => {
    agent.connect(endpoint, {
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
