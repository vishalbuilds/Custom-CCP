// get quick connect
export function getQuickConnects(onSuccess) {
  const agent = new window.connect.Agent();
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

// start quick connect call
export function StartQuickConnectCall(endpoint) {
  const agent = new window.connect.Agent();
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

// Setup contact event handlers
export function setupContactEventHandlers(dispatch) {
  window.connect.contact((contact) => {
    console.log("New contact:", contact.getContactId());

    // Contact incoming
    contact.onIncoming(() => {
      console.log(`Contact incoming ${contact.getContactId()}`);
      dispatch({
        type: "CALL_STATUS",
        phoneStatus: "incoming",
        contactId: contact.getContactId(),
      });
    });

    // Contact pending
    contact.onPending(() => {
      console.log("Contact pending");

      dispatch({
        type: "CALL_STATUS",
        phoneStatus: "pending",
        contactId: contact.getContactId(),
      });
    });

    // Contact connecting
    contact.onConnecting(() => {
      console.log("Contact connecting");
      dispatch({
        type: "CALL_STATUS",
        phoneStatus: "connecting",
        contactId: contact.getContactId(),
      });
    });

    // Contact connected
    contact.onConnected(() => {
      console.log("Contact connected");
      dispatch({
        type: "CALL_STATUS",
        phoneStatus: "connected",
        contactId: contact.getContactId(),
      });
    });

    // Contact accepted (agent accepted the call)
    contact.onAccepted(() => {
      console.log("Contact accepted");
      dispatch({
        type: "CALL_STATUS",
        phoneStatus: "accepted",
        contactId: contact.getContactId(),
      });
    });

    // Contact ended
    contact.onEnded(() => {
      console.log("Contact ended");

      dispatch({
        type: "CALL_STATUS",
        phoneStatus: "ended",
        contactId: contact.getContactId(),
      });
    });

    // Contact missed
    contact.onMissed(() => {
      console.log("Contact missed");
      dispatch({
        type: "CALL_STATUS",
        phoneStatus: "missed",
        contactId: contact.getContactId(),
      });

      setTimeout(() => {
        dispatch({
          type: "CALL_STATUS",
          phoneStatus: "idle",
          contactId: null,
        });
      }, 3000);
    });

    // ACW (After Call Work) - Contact enters ACW state
    contact.onACW(() => {
      console.log("Contact in ACW (After Call Work)");
      dispatch({
        type: "CALL_STATUS",
        phoneStatus: "acw",
        contactId: contact.getContactId(),
      });
    });

    // Contact destroyed
    contact.onDestroy(() => {
      console.log("Contact destroyed");

      dispatch({
        type: "CALL_STATUS",
        phoneStatus: "idle",
        contactId: null,
      });
    });

    // Contact error
    contact.onError((error) => {
      console.error("Contact error:", error);
      dispatch({
        type: "CALL_STATUS",
        phoneStatus: "error",
        contactId: null,
        error: error.message,
      });
    });

    // Contact refresh
    contact.onRefresh((refreshedContact) => {
      console.log("Contact refreshed");
      dispatch({
        type: "CALL_STATUS",
        phoneStatus: "refreshed",
        contactId: refreshedContact,
      });
    });
  });
}

// Update contact information
const updateContactInfo = (contact) => {
  if (!contact) return;

  const attributes = contact.getAttributes();
  const connections = contact.getConnections();
  const initialConnection = contact.getInitialConnection();
  const activeInitialConnection = contact.getActiveInitialConnection();

  setContactInfo({
    contactId: contact.getContactId(),
    type: contact.getType(),
    status: contact.getStatus().type,
    state: contact.getState().type,
    queue: contact.getQueue()?.name || "N/A",
    attributes: attributes,
    customerNumber: initialConnection?.getAddress()?.phoneNumber || "Unknown",
    duration: contact.getStatusDuration(),
    connections: connections.length,
  });
};

// Accept incoming call
const acceptCall = () => {
  if (contactRef.current) {
    const connection = contactRef.current.getActiveInitialConnection();
    if (connection) {
      connection.accept({
        success: () => {
          console.log("Call accepted successfully");
        },
        failure: (err) => {
          console.error("Failed to accept call:", err);
          setError("Failed to accept call");
        },
      });
    }
  }
};

// Reject/End call
const endCall = () => {
  if (contactRef.current) {
    const connection = contactRef.current.getActiveInitialConnection();
    if (connection) {
      connection.destroy({
        success: () => {
          console.log("Call ended successfully");
        },
        failure: (err) => {
          console.error("Failed to end call:", err);
          setError("Failed to end call");
        },
      });
    }
  }
};

// Make outbound call
const makeCall = (phoneNumber) => {
  if (!agentRef.current) {
    setError("Agent not available");
    return;
  }

  const endpoint = window.connect.Endpoint.byPhoneNumber(phoneNumber);

  agentRef.current.connect(endpoint, {
    success: () => {
      console.log("Outbound call initiated to:", phoneNumber);
    },
    failure: (err) => {
      console.error("Failed to make call:", err);
      setError("Failed to make call to " + phoneNumber);
    },
  });
};

// Hold call
const holdCall = () => {
  if (contactRef.current) {
    const connection = contactRef.current.getActiveInitialConnection();
    if (connection) {
      connection.hold({
        success: () => {
          console.log("Call on hold");
        },
        failure: (err) => {
          console.error("Failed to hold call:", err);
          setError("Failed to hold call");
        },
      });
    }
  }
};

// Resume call
const resumeCall = () => {
  if (contactRef.current) {
    const connection = contactRef.current.getActiveInitialConnection();
    if (connection) {
      connection.resume({
        success: () => {
          console.log("Call resumed");
        },
        failure: (err) => {
          console.error("Failed to resume call:", err);
          setError("Failed to resume call");
        },
      });
    }
  }
};

// Mute call
const muteCall = () => {
  if (agentRef.current) {
    agentRef.current.mute();
    console.log("Call muted");
  }
};

// Unmute call
const unmuteCall = () => {
  if (agentRef.current) {
    agentRef.current.unmute();
    console.log("Call unmuted");
  }
};

// Complete ACW (After Call Work)
const completeACW = () => {
  if (contactRef.current) {
    contactRef.current.clear({
      success: () => {
        console.log("ACW completed");
        setContactState("idle");
        setContactInfo(null);
      },
      failure: (err) => {
        console.error("Failed to complete ACW:", err);
        setError("Failed to complete ACW");
      },
    });
  }
};

// Set agent status (Available, Offline, Break, etc.)
const setAgentState = (stateName) => {
  if (!agentRef.current) return;

  const states = agentRef.current.getAgentStates();
  const targetState = states.find((state) => state.name === stateName);

  if (targetState) {
    agentRef.current.setState(targetState, {
      success: () => {
        console.log("Agent state set to:", stateName);
      },
      failure: (err) => {
        console.error("Failed to set agent state:", err);
        setError("Failed to set agent state");
      },
    });
  }
};
