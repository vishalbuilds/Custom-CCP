import { createContext, useReducer, useContext, useRef } from 'react';

const Context = createContext(null);


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
    phoneStatus: "noCall",
    phoneHome: 'phoneHome'
};




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
        case "NAVIGATION":
            return { ...state, navigation: action.payload, phoneTab: 'phoneHome' };
        case "CALL_STATUS":
            return { ...state, phoneStatus: action.callType, payload: action.payload };
        case "PHONE_HOME":
            return { ...state, phoneTab: action.payload };

        default:
            return state;
    }
}


export const ProviderCtx = ({ children }) => {
    const agentRef = useRef(null);
    const contactRef = useRef(null);
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider value={{ agentRef, contactRef, state, dispatch }}>
            {children}
        </Context.Provider>
    );
};


export default function useCTX() {
    return useContext(Context)
}


