import { useRef, useEffect } from "react";
import useCTX from "../../context/ProviderCtx";

export default function NotificationOverlay() {
    const { state, dispatch } = useCTX();
    const overlayRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Check if overlay is currently open before dispatching
            if (state.notificationOverlay.overlay &&
                overlayRef.current &&
                !overlayRef.current.contains(event.target)) {

                dispatch({
                    type: 'NOTIFICATION_OVERLAY',
                    payload: {
                        overlay: false,
                        button: 'enter',
                        heading: '',
                        message: ''
                    }
                });
            }
        };

        // Only add listener if overlay is open
        if (state.notificationOverlay.overlay) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [dispatch, state.notificationOverlay.overlay]);

    // Don't render anything if overlay is closed
    if (!state.notificationOverlay.overlay) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50`}
        >
            <div
                ref={overlayRef}
                className="rounded-lg p-8 max-w-md w-full mx-4 shadow-xl/40 bg-blue-50"
            >
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold mb-2">{state.notificationOverlay.heading || 'some heading text'}</h2>
                    <p className="text-gray-600 mb-6">{state.notificationOverlay.message || 'some message text'}</p>

                    <button
                        onClick={() => {
                            // Handle button click based on button type
                            if (state.notificationOverlay.button === 'refresh') {
                                window.location.reload();
                            } else {
                                dispatch({
                                    type: 'NOTIFICATION_OVERLAY',
                                    payload: {
                                        overlay: false,
                                        button: 'enter',
                                        heading: '',
                                        message: ''
                                    }
                                });
                            }
                        }}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        {state.notificationOverlay.button === 'refresh' ? 'Refresh Page' :
                            state.notificationOverlay.button === 'close' ? 'Close' : 'Enter'}
                    </button>
                </div>
            </div>
        </div>
    )
}