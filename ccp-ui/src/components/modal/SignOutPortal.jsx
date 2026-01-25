import { createPortal } from 'react-dom';
import { CheckCheck, RefreshCw } from 'lucide-react';

export default function LoadingPortal() {
    const handleRefresh = () => {
        window.location.reload();
    };


    return createPortal(
        <div
            className="fixed inset-0 z-99999` flex items-center justify-center bg-black/40 backdrop-blur-xl cursor-not-allowed"

        >
            <div
                className="flex flex-col items-center p-10 bg-white rounded-2xl shadow-2xl border border-gray-200"

            >
                <div className="relative mb-6">
                    {/* Main Rotating Loader */}
                    <CheckCheck className="w-16 h-16 text-blue-600" strokeWidth={1.5} />
                    {/* Subtle outer pulse */}
                    <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-ping opacity-10"></div>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Successfully Signed Out from CCP
                </h2>

                <p className="text-sm text-gray-500 text-center max-w-xs mb-6">
                    Please refresh to re-sign in to CCP.
                </p>

                {/* Refresh Button */}
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
                >
                    <RefreshCw className="w-5 h-5" />
                    Refresh Page
                </button>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}