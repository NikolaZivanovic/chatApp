import {
    GET_NEW_MESSAGES_IN_PROGRESS,
    GET_NEW_MESSAGES_SUCCESS,
    GET_NEW_MESSAGES_ERROR,
} from './NewMessages.actionTypes';


const INIT_STATE = {
    isLoading: null,
    isError: null,
    errorMessage: null,
    data: null,
};

export default function MessagesReducer(state = INIT_STATE, action) {
    switch (action.type) {

        case GET_NEW_MESSAGES_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case GET_NEW_MESSAGES_SUCCESS:

            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.data,
            };

        case GET_NEW_MESSAGES_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: null,
                errorMessage: action.error,
            };

        default:
            return state;
    }
}

