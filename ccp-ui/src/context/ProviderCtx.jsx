import { createContext, useReducer, useContext, useRef } from 'react';
import { agentDetails } from '../components/Header/headerHandler';

const Context = createContext(null);





/*

agentDetails={
name:verra
allStatus: [avaial, offliek, ,....]
currentstatus: availae,
issoftphoeEnable: true/false
desk phone number if enable or option too set
}


*/

const initialState = {
    agentPrfile: {
        name: '',
        allStatus: [],
        currentstatus: '',
        issoftphoeEnable: true,
        deskPhoneNumber: ''
    },
    agentName: '',
    contact: '',
    currentStatus: '',
    ccpStatus: 'loading',
    navigation: 'home',
    phoneStatus: "noCall",
    phoneHome: 'phoneHome'
};


function Reducer(state, action) {
    switch (action.type) {

        case 'AGENT_PROFILE':
            return { ...state, agentPrfile: { ...state.agentPrfile, ...action.payload, } }; // all agent profile name, allStatus,, currentStata, isSoftphoneEnable, deskPhoneNumber

        // ccp status 
        case 'CCP_STATUS':
            return { ...state, ccpStatus: action.payload }; // loading, authError, initialised, signout, authErrorExhausted, accessDenied

        //agent value
        case 'AGENT_NAME':
            return { ...state, agentName: action.payload }; // rahul, ...
        case 'AVAILABLE_STATES':
            return { ...state, availableStatus: action.payload }; // [offline, online, meeting, ...]
        case 'CURRENT_STATE':
            return { ...state, currentStatus: action.payload };  // offline / online / meeting

        //phone tab
        case "NAVIGATION":
            return { ...state, phoneHome: action.payload, navigation: action.payload }; // phonehome, chathome, home
        case "CALL_STATUS":
            return { ...state, phoneStatus: action.callType, contact: action.payload }; // connected, disconnected, missed, error, incomming
        case "PHONE_HOME":
            return { ...state, phoneHome: action.payload };  //dialpad, qc, noring, connected, disconnected, missed, error, incomming

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


