import { createContext, useReducer, useContext, useRef } from 'react';


const StateContext = createContext();
const DispatchContext = createContext();
const refContext = createContext();


const initialState = {
    agentName: '',
    ccp_status: 'Loading',
    contact: '',
    availableStatus: [],
    currentStatus: '',
    callStatus: '',
    signOut: false,
    navigation: 'home',
    phoneTab: 'phoneHome',
};

function setPhoneInNavigation(payloadNav, statePhone) {
    if (payloadNav !== "phone") {
        return "";
    }

    switch (statePhone) {
        case "INCOMING_CALL":
            return "incoming";
        case "OUTGOING_CALL":
            return "outgoing";
        case "MISSED_CALL":
            return "missed";
        default:
            return "";
    }
}



function Reducer(state, action) {
    switch (action.type) {
        //ccp  value
        case 'CCP_INIT_SUCCESS':
            return { ...state, ccp_status: "Initialized" };
        case 'CCP_INIT_FAILURE':
            return { ...state, ccp_status: "CCP_Init_Failed" };
        case 'AUTH_FAILED':
            return { ...state, ccp_status: "Authentication_Failed" };
        case 'CCP_SIGNOUT':
            return { ...state, signOut: true };
        //
        //agent value
        case 'AGENT_INIT_FAILURE':
            return { ...state, agent_status: "Init_Failed", ccp_status: "Agent_Init_Failed" };
        case 'AGENT_NAME':
            return { ...state, agentName: action.payload };
        case 'AVAILABLE_STATES':
            return { ...state, availableStatus: action.payload };
        case 'CURRENT_STATE':
            return { ...state, currentStatus: action.payload };
        //contact values
        case 'NEW_CONTACT':
            return { ...state, contact: action.payload };
        case "CALL_CONNECTING":
            return { ...state, callStatus: 'Connecting' };
        case "CALL_CONNECTED":
            return { ...state, callStatus: 'Connected' };
        case "CALL_ENDED":
            return { ...state, callStatus: 'Ended' };

        //phone tab
        case 'INCOMING_CALL':
            return { ...state, phoneTab: 'incoming' };
        case 'OUTGOING_CALL':
            return { ...state, phoneTab: 'outgoing' };
        case 'MISSED_CALL':
            return { ...state, phoneTab: 'missed' };
        case 'QC':
            return { ...state, phoneTab: 'qc', payload: action.payload };
        case 'DIALPAD':
            return { ...state, phoneTab: 'dialpad' };
        case 'PHONE_HOME':
            return { ...state, phoneTab: 'phoneHome' };

        //side bar value
        case 'NAVIGATION':
            const newState = { ...state, navigation: action.payload };
            // Reset phoneTab to phoneHome when navigating to phone
            if (action.payload === 'phone') {
                newState.phoneTab = 'phoneHome';
            }
            return newState;

        //default
        default:
            return state;
    }
}


export const ProviderCtx = ({ children }) => {
    const agentRef = useRef(null);
    const contactRef = useRef(null);
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <refContext.Provider value={{ agentRef, contactRef }}>
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>
                    {children}
                </DispatchContext.Provider>
            </StateContext.Provider>
        </refContext.Provider>
    );
};


export const useAppState = () => useContext(StateContext);
export const useAppDispatch = () => useContext(DispatchContext);
export const useAppRef = () => useContext(refContext);