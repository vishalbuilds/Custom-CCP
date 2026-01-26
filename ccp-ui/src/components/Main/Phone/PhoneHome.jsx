import { useAppDispatch } from "../../../context/ProviderCtx.jsx"



export default function PhoneHome() {
    const dispatch = useAppDispatch();



    const button = (tab, tabType) => (
        <button
            onClick={() => dispatch({ type: tabType })}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-300 hover:shadow-lg transition-all duration-200"
        >
            {tab}
        </button>
    );

    return (
        < div className="flex-1 flex flex-col items-center mb-30 justify-center p-10 text-center gap-4">
            <p className=" text-slate-400 font-semibold text-3xl mb-4" >No Active Calls</p>
            {button("Dialpad", "DIALPAD")}
            {button("Quick Connects", 'QC')}


        </div >

    );

}
