import 'amazon-connect-streams'
import { useEffect, useRef, memo } from 'react';
import { CCP_CONFIG } from '../../ccpConfig.js';
import useCTX from './../../context/ProviderCtx.jsx';





const ConnectCCP = () => {
    const { dispatch } = useCTX();
    const containerRef = useRef(null);


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
                    logLevel: window.connect.LogLevel.DEBUG,
                    echoLevel: window.connect.LogLevel.DEBUG,
                }
            });



            // Handle authentication failures
            window.connect.core.onAuthorizeSuccess(() => {
                console.error('Authentication success');
                dispatch({ type: 'CCP_STATUS', payload: 'authSuccess' });

            });


            // Handle authentication failures
            window.connect.core.onAuthFail(() => {
                console.error('Authentication failed');
                dispatch({ type: 'CCP_STATUS', payload: 'authError' });

            });


            // handle auth retry
            window.connect.core.onAuthorizeRetriesExhausted(() => {
                console.log('Authorization retries exhausted');
                dispatch({ type: 'CCP_STATUS', payload: 'authErrorExhausted' });

            });

            // handle access denied
            window.connect.core.onAccessDenied(() => {
                console.log('Access denied');
                dispatch({ type: 'CCP_STATUS', payload: 'accessDenied' });

            });

            // handle getting agent config
            window.connect.agent((agent) => {
                const config = agent.getConfiguration();
                dispatch({ type: "AGENT_CONFIG", payload: config });

                const currentStatus = agent.getAvailabilityState();
                dispatch({ type: "CURRENT_STATUS", payload: currentStatus });
            })


            // Handle initialization success
            window.connect.core.onInitialized(() => {
                dispatch({ type: 'CCP_STATUS', payload: 'initialised' });
                console.log('CCP Initialized');

            });


        } catch (err) {
            dispatch({ type: 'CCP_INIT_FAILURE' });
            console.error('CCP Init Error:', err);
        }

    };



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

        // Cleanup
        return () => {
            if (window.connect && window.connect.core) {
                window.connect.core.terminate();
            }
        };
    });



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
