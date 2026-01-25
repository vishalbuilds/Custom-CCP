import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Loader2 } from 'lucide-react';



export default function LoadingPortal({ agentRef }) {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // 1. BLOCK ESCAPE & KEYBOARD INTERACTION
        const handleKeyDown = (e) => {
            // Prevents Escape or any other key from interrupting the load
            e.preventDefault();
            e.stopPropagation();
        };

        window.addEventListener('keydown', handleKeyDown, true);

        // 2. CHECK FOR CCP INITIALIZATION (agentRef)
        const checkInterval = setInterval(() => {
            if (agentRef.current) {
                setIsVisible(false);
                clearInterval(checkInterval);
            }
        }, 100);

        // 3. HARD RELOAD ENTIRE APP AFTER 40 SECONDS
        const reloadTimer = setTimeout(() => {
            if (!agentRef.current) {
                console.log("CCP failed to initialize in 15s. Reloading app...");
                window.location.reload(true); // 'true' forces a reload from the server
            }
        }, 10000);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
            clearInterval(checkInterval);
            clearTimeout(reloadTimer);
        };
    }, [agentRef]);

    if (!isVisible) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 backdrop-blur-xl cursor-wait"
            // Disable clicks on the entire screen
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <div className="flex flex-col items-center p-10 bg-white rounded-2xl shadow-2xl border border-gray-200">
                <div className="relative mb-6">
                    {/* Main Rotating Loader */}
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin" strokeWidth={1.5} />
                    {/* Subtle outer pulse */}
                    <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-ping opacity-10"></div>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    CCP is initializing...
                </h2>

                <p className="text-sm text-gray-500 text-center max-w-62.5">
                    Connecting to Amazon Connect. The app will automatically refresh if this takes too long.
                </p>

                {/* Visual Timer Bar */}
                <div className="w-full h-1 bg-gray-100 rounded-full mt-6 overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all duration-15000 ease-linear"
                        style={{ width: isVisible ? '100%' : '0%' }}
                    ></div>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")

    );
};

