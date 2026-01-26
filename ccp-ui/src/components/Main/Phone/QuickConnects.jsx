import { useEffect, useState, useMemo } from "react";
import { Phone, Search, X, ArrowLeft } from "lucide-react";
import { getQuickConnects, StartQuickConnectCall } from "./phoneHandler.js"
import useCTX from "../../../context/ProviderCtx.jsx";


export default function UserSearch() {

    const { agentRef, dispatch } = useCTX();
    const [endpointList, setEndpointList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, seterror] = useState(false);




    useEffect(() => {
        try {
            getQuickConnects(
                agentRef,
                (endpoints) => setEndpointList(endpoints),
                console.error
            );
        } catch (error) {
            console.error("Failed to fetch quick connects:", error);
        }
    }, []);


    function startCall(qc) {

        StartQuickConnectCall(qc, agentRef)
            .then(dispatch({ type: "QC", payload: qc }), seterror(false))
            .catch(seterror(true));

    }




    const filteredEndpointList = useMemo(() => {
        if (!searchQuery.trim()) {
            return endpointList;
        }
        return endpointList.filter(qc =>
            qc.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [endpointList, searchQuery]);


    return (
        <>
            <div className="flex flex-col h-full">

                <div className="flex items-center mb-6">
                    <button
                        onClick={() => dispatch({ type: "PHONE_HOME", payload: "phoneHome" })}
                        className="flex items-center gap-2 p-10 text-blue-600 hover:text-blue-800 font-medium"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>
                </div>
                <div>

                </div>
                <div className="w-full max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4  text-center">Quick Connects</h2>
                    <div className="relative mb-4">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-700 placeholder:text-slate-400"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={16} className="text-black" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="h-64 overflow-y-auto scroll-smooth place-items-center justify-between">
                    {filteredEndpointList.length > 0 ? (
                        filteredEndpointList.map((qc) => (
                            <button
                                key={qc.name}
                                onClick={() => startCall(qc)}
                                className="p-1 capitalize bg-white flex group hover:border-blue-500 transition-all duration-200"
                            >

                                <p className=" font-medium text-slate-700 group-hover:text-blue-600 transition-colors pl-3">
                                    {qc.name}
                                </p>

                            </button>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <Search size={48} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">No contacts found</p>
                        </div>
                    )}
                </div>

            </div >
            {error && (
                <p className="fixed bottom-12 right-5 bg-red-600 rounded-full px-10 py-3 text-white font-medium text-center shadow-lg animate-pulse">
                    <button onClick={() => seterror(false)}> ERROR: UNABLE TO START CALL </button>
                </p>
            )}

        </>
    );
}
