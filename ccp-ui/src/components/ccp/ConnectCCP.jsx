import 'amazon-connect-streams'
import { useEffect, useRef, memo } from 'react';
import { agentHandler } from './agentHandler.js';
import { contactHandler } from './contactHandler.js'
import { CCP_CONFIG } from '../../ccpConfig.js';
import useCTX from './../../context/ProviderCtx.jsx';





const ConnectCCP = () => {
    const { agentRef, contactRef, dispatch } = useCTX();
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
                    enablePhoneTypeSettings: false
                },
                logConfig: {
                    logLevel: connect.LogLevel.DEBUG,
                    echoLevel: connect.LogLevel.DEBUG,
                }
            });

            // Handle agents
            window.connect.agent((agent) => {
                try {

                    agentRef.current = agent;
                    agentHandler(agent, dispatch);

                    dispatch({ type: 'CCP_INIT_SUCCESS' });
                } catch (err) {
                    dispatch({ type: 'CCP_INIT_FAILURE' });
                    console.error("Agent init failed:", err);
                }
            });


            // Handle contacts
            window.connect.contact((contact) => {

                try {
                    contactRef.current = contact;
                    contactHandler(contact, dispatch, contactRef);
                } catch (err) {
                    dispatch({ type: 'CCP_INIT_FAILURE' });
                    console.error("contact init failed:", err);
                }
            });




            // Handle authentication failures
            window.connect.core.onAuthFail(() => {
                console.error('Authentication failed');
                dispatch({ type: 'AUTH_FAILED' });

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


