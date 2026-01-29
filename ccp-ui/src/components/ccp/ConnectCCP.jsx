import 'amazon-connect-streams'
import { useEffect, useRef, memo } from 'react';
import { CCP_CONFIG } from '../../ccpConfig.js';
import useCTX from './../../context/ProviderCtx.jsx';





const ConnectCCP = () => {
    const { dispatch, state } = useCTX();
    const containerRef = useRef(null);

    // init ccp 
    useEffect(() => {
        if (!containerRef.current) {
            dispatch({ type: 'CCP_INIT_FAILURE' });
            console.error('Container not found');
            return;
        }

        // Load Amazon Connect Streams library if not loaded 
        if (!window.connect) {
            let script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/amazon-connect-streams/release/connect-streams-min.js';
            script.async = true;
            script.onload = () => initCCP();
            document.body.appendChild(script);

            return () => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        } else {
            initCCP();
        }
    }, []);

    //initCCP fuction 
    const initCCP = () => {
        if (!containerRef.current || !window.connect) {
            dispatch({ type: 'CCP_INIT_FAILURE' });
            console.error('Container or window.connect not found');
            return
        };

        try {
            window.connect.core.initCCP(containerRef.current, {
                ccpUrl: `${CCP_CONFIG.ccp_domain}/connect/ccp-v2/`,
                loginPopup: true,
                loginPopupAutoClose: true,
                softphone: {
                    allowFramedSoftphone: true
                },
                pageOptions: {
                    enableAudioDeviceSettings: false,
                    enablePhoneTypeSettings: true
                },
                logConfig: {
                    logLevel: connect.LogLevel.DEBUG,
                    echoLevel: connect.LogLevel.DEBUG,
                }
            });



            // Handle authentication failures
            connect.core.onAuthorizeSuccess(() => {
                console.error('Authentication success');
                dispatch({ type: 'CCP_STATUS', payload: 'authSuccess' });

            });


            // Handle authentication failures
            connect.core.onAuthFail(() => {
                console.error('Authentication failed');
                dispatch({ type: 'CCP_STATUS', payload: 'authError' });

            });


            // handle auth retry
            connect.core.onAuthorizeRetriesExhausted(() => {
                console.log('Authorization retries exhausted');
                dispatch({ type: 'CCP_STATUS', payload: 'authErrorExhausted' });

            });

            // handle access denied
            connect.core.onAccessDenied(() => {
                console.log('Access denied');
                dispatch({ type: 'CCP_STATUS', payload: 'accessDenied' });

            });

            // handle getting agent config
            connect.agent((agent) => {
                const config = agent.getConfiguration();
                dispatch({ type: "AGENT_CONFIG", payload: config });

                const currentStatus = agent.getAvailabilityState();
                dispatch({ type: "CURRENT_STATUS", payload: currentStatus });
            })


            // Handle initialization success
            connect.core.onInitialized(() => {
                dispatch({ type: 'CCP_STATUS', payload: 'initialised' });
                console.log('CCP Initialized');

            });


        } catch (err) {
            dispatch({ type: 'CCP_INIT_FAILURE' });
            console.error('CCP Init Error:', err);
        }

    };
    return (<div
        ref={containerRef}
        style={{
            width: '0px',
            height: '0px',
            position: 'absolute',
            left: '-9999px',
            visibility: 'hidden',
            pointerEvents: 'none'
        }}
    />)

};

export default memo(ConnectCCP);




// // Function to change agent status
// const changeStatus = (statusName) => {
//     if (!agentRef.current) {
//         console.error('Agent not initialized');
//         return;
//     }

//     const targetState = agentStates.find(state =>
//         state.name.toLowerCase() === statusName.toLowerCase()
//     );

//     if (targetState) {
//         agentRef.current.setState(targetState, {
//             success: () => console.log('Status changed to:', statusName),
//             failure: (err) => console.error('Failed to change status:', err)
//         });
//     } else {
//         console.error('Status not found:', statusName);
//     }
// };


// return (
//     <div className="p-4 bg-gray-50 rounded-lg">
//         <div className="mb-4">
//             <h2 className="text-xl font-bold mb-2">CCP Status</h2>
//             <p className="text-sm">
//                 <strong>Agent:</strong> {agentName || 'Not logged in'}
//             </p>
//             <p className="text-sm">
//                 <strong>Status:</strong> {currentStatus}
//             </p>
//             <p className="text-sm">
//                 <strong>Initialized:</strong> {isInitialized ? 'Yes' : 'No'}
//             </p>
//         </div>

//         {isInitialized && agentStates.length > 0 && (
//             <div className="mb-4">
//                 <h3 className="font-semibold mb-2">Available States:</h3>
//                 <div className="flex gap-2 flex-wrap">
//                     {agentStates.map((state) => (
//                         <button
//                             key={state.name}
//                             onClick={() => changeStatus(state.name)}
//                             className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
//                         >
//                             {state.name}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         )}

//         {/* Hidden CCP Container */}
//         <div
//             ref={containerRef}
//             style={{
//                 width: '0px',
//                 height: '0px',
//                 position: 'absolute',
//                 left: '-9999px',
//                 visibility: 'hidden'
//             }}
//         />
//     </div>
// );


