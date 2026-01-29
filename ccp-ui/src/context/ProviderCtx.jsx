import { createContext, useReducer, useContext, useRef } from 'react';


const Context = createContext(null);





/*

// agent config mapping
{
    "name": "test",
    "username": "test",
    "firstName": "test",
    "lastName": "test",
    "softphoneEnabled": true,
    "softphoneAutoAccept": false,
    "softphonePersistentConnection": true,
    "extension": "",
    "routingProfile": {
        "name": "Basic Routing Profile",
        "routingProfileARN": "arn:aws:connect:us-west-2:668319989635:instance/fc485072-0879-4ed3-8de5-1ed60ffc4e3d/routing-profile/d48fd43b-1c9f-468f-9b35-cdd2018469f7",
        "defaultOutboundQueue": {
            "queueARN": "arn:aws:connect:us-west-2:668319989635:instance/fc485072-0879-4ed3-8de5-1ed60ffc4e3d/queue/403bdbf5-94b5-483d-a669-0d9ce1a7fe4c",
            "name": "BasicQueue",
            "queueId": "arn:aws:connect:us-west-2:668319989635:instance/fc485072-0879-4ed3-8de5-1ed60ffc4e3d/queue/403bdbf5-94b5-483d-a669-0d9ce1a7fe4c"
        },
        "channelConcurrencyMap": {
            "CHAT": 2,
            "TASK": 1,
            "VOICE": 1
        },
        "queues": [
            {
                "queueARN": "arn:aws:connect:us-west-2:668319989635:instance/fc485072-0879-4ed3-8de5-1ed60ffc4e3d/queue/403bdbf5-94b5-483d-a669-0d9ce1a7fe4c",
                "name": "BasicQueue",
                "queueId": "arn:aws:connect:us-west-2:668319989635:instance/fc485072-0879-4ed3-8de5-1ed60ffc4e3d/queue/403bdbf5-94b5-483d-a669-0d9ce1a7fe4c"
            },
            {
                "queueARN": "arn:aws:connect:us-west-2:668319989635:instance/fc485072-0879-4ed3-8de5-1ed60ffc4e3d/queue/agent/d975b509-2a04-442f-a0e3-023924ed1fd2",
                "name": null,
                "queueId": "arn:aws:connect:us-west-2:668319989635:instance/fc485072-0879-4ed3-8de5-1ed60ffc4e3d/queue/agent/d975b509-2a04-442f-a0e3-023924ed1fd2"
            }
        ],
        "routingProfileId": "arn:aws:connect:us-west-2:668319989635:instance/fc485072-0879-4ed3-8de5-1ed60ffc4e3d/routing-profile/d48fd43b-1c9f-468f-9b35-cdd2018469f7"
    },
    "agentPreferences": {
        "AUDIO_ALERT_ENABLED": "false",
        "LANGUAGE": "en_US"
    },
    "agentARN": "arn:aws:connect:us-west-2:668319989635:instance/fc485072-0879-4ed3-8de5-1ed60ffc4e3d/agent/d975b509-2a04-442f-a0e3-023924ed1fd2",
    "permissions": [
        "outboundCall",
        "voiceId",
        "ccpRealtimeContactLens",
        "contactRecording",
        "audioDeviceSettings",
        "videoContact",
        "outboundEmail",
        "selfAssignContacts"
    ],
    "dialableCountries": [
        "ca",
        "gb",
        "us",
        "mx",
        "pr"
    ],
    "agentStates": [
        {
            "agentStateARN": "arn:aws:connect:us-west-2:668319989635:instance/fc485072-0879-4ed3-8de5-1ed60ffc4e3d/agent-state/5ae9c9a2-707a-43cb-a771-1c2b1dcc79ca",
            "type": "routable",
            "name": "Available",
            "startTimestamp": null
        },
        {
            "agentStateARN": "arn:aws:connect:us-west-2:668319989635:instance/fc485072-0879-4ed3-8de5-1ed60ffc4e3d/agent-state/be546a41-f4fd-4df2-823c-fe18c2e34cff",
            "type": "offline",
            "name": "Offline",
            "startTimestamp": null
        }
    ]
}


*/

const initialState = {
    agentConfig: {},
    contact: '',
    currentStatus: '',
    ccpStatus: 'loading',
    navigation: 'home',
    phoneStatus: "noCall",
    phoneHome: 'phoneHome'
};


function Reducer(state, action) {
    switch (action.type) {

        case 'AGENT_CONFIG':
            return { ...state, agentConfig: action.payload }; // all agent profile name, allStatus,, currentStata, isSoftphoneEnable, deskPhoneNumber

        // ccp initialsed status 
        case 'CCP_STATUS':
            return { ...state, ccpStatus: action.payload }; // loading, authError, initialised, signout, authErrorExhausted, accessDenied

        //agent current value
        case 'CURRENT_STATUS':
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
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};


export default function useCTX() {
    return useContext(Context)
}


