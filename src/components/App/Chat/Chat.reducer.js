import {
    GET_MESSAGES_IN_PROGRESS,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_ERROR,
    GET_MESSAGES_RESET_DATA,
} from './Chat.actionTypes';
import {MESSAGE_REQUEST_SUCCESS} from './SendMessageRequest/SendMessageRequest.actionTypes';
import {GET_NEW_MESSAGES_SUCCESS} from './NewMessagesRequest/NewMessages.actionTypes';
import _cloneDeep from 'lodash/cloneDeep';


const INIT_STATE = {
    isLoading: null,
    isError: null,
    errorMessage: null,
    data: null,
};

export default function MessagesReducer(state = INIT_STATE, action) {
    switch (action.type) {

        case GET_MESSAGES_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case GET_MESSAGES_SUCCESS:
            if (state.data === null) {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    data: action.data,
                };
            } else {
                return addMessagesToState(state, action.data)
            }

        case MESSAGE_REQUEST_SUCCESS:
            return addMessagesToState(state, action.data);

        case GET_NEW_MESSAGES_SUCCESS:
            return addNewMessagesToState(state, action.data);

        case GET_MESSAGES_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: null,
                errorMessage: action.error,
            };

        case GET_MESSAGES_RESET_DATA:
            return {
                ...INIT_STATE
            };

        default:
            return state;
    }
}

const addMessagesToState = (state, newMessages) => {
    const newState = _cloneDeep(state);
    if (!Array.isArray(newState.data)) {
        newState.data = [];
    }
    if (newMessages.length > 1) {
        newState.data.push(...newMessages);
    } else {
        newState.data.unshift(...newMessages);
    }

    return newState;
};

const addNewMessagesToState = (state, newMessages) => {
    const newState = _cloneDeep(state);
    if (!Array.isArray(newState.data)) {
        newState.data = [];
    }
    newState.data.push(...newMessages);

    return newState;
};

