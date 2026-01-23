import { useEffect, useRef, memo, useState } from 'react';
import 'amazon-connect-streams'
import { useDispatch } from '../context/hooksContext.jsx'




const ConnectCCP = () => {
    const containerRef = useRef(null);
    const agentRef = useRef(null);
    const contactRef = useRef(null);


    const dispatch = useDispatch();

    // init ccp 
    useEffect(() => {
        if (!containerRef.current) {
            console.error('Container not found');
            return;
        }

        // Load Amazon Connect Streams library if not already loaded
        if (!window.connect) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/amazon-connect-streams/release/connect-streams-min.js';
            script.async = true;
            script.onload = () => initializeCCP();
            document.body.appendChild(script);

            return () => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        } else {
            initializeCCP();
        }
    }, []);

    //initCCP fuction 
    const initializeCCP = () => {
        if (!containerRef.current || !window.connect) return;

        try {
            window.connect.core.initCCP(containerRef.current, {
                ccpUrl: "https://vishaltesting-aws-connect.my.connect.aws/connect/ccp-v2/",
                loginPopup: true,
                loginPopupAutoClose: true,
                softphone: {
                    allowFramedSoftphone: true
                },
                pageOptions: {
                    enableAudioDeviceSettings: false,
                    enablePhoneTypeSettings: false
                }
            });

            // CORRECT WAY: Use callback to get agent
            window.connect.agent((agent) => {
                agentRef.current = agent;


                //Get agent name
                const name = agent.getName()
                dispatch({ type: 'name', payload: name });

                // Get available agent states
                const states = agent.getAgentStates();
                dispatch({ type: 'available_states', payload: states });

                // Get current status
                const currentState = agent.getAvailabilityState()
                dispatch({ type: 'current_status', payload: currentState.state });


                //ccp initiation state
                dispatch({ type: 'isInitialise', payload: true });


                // Listen for status changes
                agent.onRefresh((updatedAgent) => {
                    const state = updatedAgent.getAvailabilityState().state
                    dispatch({ type: 'current_status_onRefresh', payload: state });
                });

            });

            // Handle contacts
            window.connect.contact((contact) => {
                contactRef.current = contact;

                //CCP assigned contact id
                const assignedContactId = contact.getContactId();
                dispatch({ type: 'assigned_contact_id', payload: assignedContactId });
                console.log('Contact received:', assignedContactId);

                contact.onConnecting(() => {
                    dispatch({ type: 'current_status', payload: 'Call_Connecting' });
                    console.log('Contact connecting');
                });

                contact.onConnected(() => {
                    dispatch({ type: 'current_status', payload: 'Call_Connected' });
                    console.log('Contact connected');
                });

                contact.onEnded(() => {
                    console.log('Contact ended');
                    dispatch({ type: 'current_status', payload: 'Call_Ended' });
                    contactRef.current = null;
                });
            });

            // Handle authentication failures
            window.connect.core.onAuthFail(() => {
                console.error('Authentication failed');
                dispatch({ type: 'current_status', payload: 'Authentication_Failed' });

            });

        } catch (err) {
            console.error('CCP Init Error:', err);
            dispatch({ type: 'current_status', payload: 'CCP_Init_Error' });
        }
    };

    // Function to change agent status
    const changeStatus = (statusName) => {
        if (!agentRef.current) {
            console.error('Agent not initialized');
            return;
        }

        const targetState = agentStates.find(state =>
            state.name.toLowerCase() === statusName.toLowerCase()
        );

        if (targetState) {
            agentRef.current.setState(targetState, {
                success: () => console.log('Status changed to:', statusName),
                failure: (err) => console.error('Failed to change status:', err)
            });
        } else {
            console.error('Status not found:', statusName);
        }
    };

    // Expose methods for parent component
    useEffect(() => {
        // You can expose these via props or context if needed
        window.ccpControls = {
            changeStatus,
            getAgent: () => agentRef.current,
            getContact: () => contactRef.current
        };
    }, [agentStates]);

    return (
        <div className="p-4 bg-gray-50 rounded-lg">
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">CCP Status</h2>
                <p className="text-sm">
                    <strong>Agent:</strong> {agentName || 'Not logged in'}
                </p>
                <p className="text-sm">
                    <strong>Status:</strong> {currentStatus}
                </p>
                <p className="text-sm">
                    <strong>Initialized:</strong> {isInitialized ? 'Yes' : 'No'}
                </p>
            </div>

            {isInitialized && agentStates.length > 0 && (
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Available States:</h3>
                    <div className="flex gap-2 flex-wrap">
                        {agentStates.map((state) => (
                            <button
                                key={state.name}
                                onClick={() => changeStatus(state.name)}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                            >
                                {state.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Hidden CCP Container */}
            <div
                ref={containerRef}
                style={{
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    left: '-9999px',
                    visibility: 'hidden'
                }}
            />
        </div>
    );
};

export default memo(ConnectCCP);