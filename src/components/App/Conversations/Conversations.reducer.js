import {
    GET_ALL_CONVERSATIONS_IN_PROGRESS,
    GET_ALL_CONVERSATIONS_SUCCESS,
    GET_ALL_CONVERSATIONS_ERROR,
} from './Conversations.actionTypes';


const INIT_STATE = {
    isLoading: null,
    isError: null,
    errorMessage: null,
    data: null,
};

export default function ConversationsReducer(state = INIT_STATE, action) {
    switch (action.type) {

        case GET_ALL_CONVERSATIONS_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case GET_ALL_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.data,
            };

        case GET_ALL_CONVERSATIONS_ERROR:
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
