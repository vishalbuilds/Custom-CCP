import { useState, useEffect } from "react";
import useCTX from "../../context/ProviderCtx";

export default function CallStatusInput() {
    const { state, dispatch } = useCTX();
    const [inputValue, setInputValue] = useState("");

    const handleClick = () => {
        dispatch({
            type: "CALL_STATUS",
            callType: inputValue,
        });
    };

    // Log when state updates
    useEffect(() => {
        console.log("phoneStatus:", state.phoneStatus);
    }, [state.phoneStatus]);

    return (
        <div className="flex gap-2 items-center">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border px-3 py-1 rounded"
                placeholder="Enter call status"
            />

            <button
                onClick={handleClick}
                className="bg-blue-600 text-white px-4 py-1 rounded"
            >
                Set Status
            </button>
        </div>
    );
}
