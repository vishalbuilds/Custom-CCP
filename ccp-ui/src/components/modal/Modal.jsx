import useCTX from "../../context/ProviderCtx.jsx";
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Loader2, CheckCheck, RefreshCw, UserX, Bug } from 'lucide-react';

export default function Modal() {
    const { state } = useCTX();
    const [modalObj, setModalObj] = useState({});

    const handleRefresh = () => {
        window.location.reload();
    };

    useEffect(() => {
        const loading = state.ccpStatus === 'loading';
        const authError = state.ccpStatus === 'authError';
        const signout = state.ccpStatus === 'signout';
        const authErrorExhausted = state.ccpStatus === 'authErrorExhausted';
        const accessDenied = state.ccpStatus === 'accessDenied';

        setModalObj({
            loadingCursor: loading ? 'cursor-wait' : 'cursor-not-allowed',
            icon: loading ? Loader2
                : (authError || authErrorExhausted || accessDenied) ? UserX
                    : signout ? CheckCheck
                        : Bug,
            textHeading: loading ? 'CCP is initializing...'
                : (authError || authErrorExhausted || accessDenied) ? 'Authentication Failed'
                    : signout ? 'Signed Out'
                        : 'CCP Error',
            textMain: loading ? 'Connecting to Amazon Connect. The app will automatically refresh if this takes too long.'
                : (authError || authErrorExhausted) ? 'We were unable to authenticate your Amazon Connect session. Please check your credentials or try again.'
                    : accessDenied ? "Authentication was successful, but access is denied. Please contact support."
                        : signout ? 'You have been successfully signed out from Amazon Connect CCP. Please refresh to re-sign in.'
                            : 'Something went wrong while loading CCP. Please refresh the page or contact support.',
            refreshButton: authError || authErrorExhausted || signout,
            boxBGColor: loading ? 'bg-blue-400'
                : (authError || authErrorExhausted || accessDenied) ? 'bg-red-400'
                    : 'bg-green-400',

        });

        const refreshTimer = setTimeout(() => {
            if (loading) {
                console.log("CCP failed to initialize in 50s. Reloading app...");
                handleRefresh();
            }
        }, 50000);

        return () => {
            clearTimeout(refreshTimer);
        };
    }, [state.ccpStatus]);

    const IconComponent = modalObj.icon;

    return createPortal(
        <div
            className={`fixed inset-0 ${modalObj.boxBGColor} bg-opacity-50 flex items-center justify-center z-50 ${modalObj.loadingCursor}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <div className=" bg-white  rounded-lg p-8 max-w-md w-full mx-4 shadow-xl/40">
                <div className="flex flex-col items-center text-center">
                    {IconComponent && (
                        <IconComponent
                            className={`w-16 h-16 mb-4 ${state.ccpStatus === 'loading' ? 'animate-spin text-blue-500' : 'text-gray-600'
                                }`}
                        />
                    )}

                    <h2 className="text-2xl font-bold mb-2">{modalObj.textHeading}</h2>
                    <p className="text-gray-600 mb-6">{modalObj.textMain}</p>

                    {modalObj.refreshButton && (
                        <button
                            onClick={handleRefresh}
                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh Page
                        </button>
                    )}
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}