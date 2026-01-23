import { createContext, useReducer, useContext } from 'react';


const StateContext = createContext();
const DispatchContext = createContext();


const initialState = {
    agentStates: [],
    currentStatus: 'Initializing...',
    agentName: '',
    isInitialized: false,
};

function Reducer(state, action) {
    switch (action.type) {
        case 'SET_INITIALIZED':
            return { ...state, isInitialized: true, currentStatus: 'Ready' };
        case 'UPDATE_NAME':
            return { ...state, agentName: action.payload };
        case 'UPDATE_STATUS':
            return { ...state, currentStatus: action.payload };
        default:
            return state;
    }
}


export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <StateContext value={state}>
            <DispatchContext value={dispatch}>
                {children}
            </DispatchContext>
        </StateContext>
    );
};


export const useState = () => useContext(StateContext);
export const useDispatch = () => useContext(DispatchContext);