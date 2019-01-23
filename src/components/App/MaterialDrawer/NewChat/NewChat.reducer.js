import {
    REQUEST_NEW_CHAT_IN_PROGRESS,
    REQUEST_NEW_CHAT_SUCCESS,
    REQUEST_NEW_CHAT_ERROR,
} from './NewChat.actionTypes';


const INIT_STATE = {
    isLoading: null,
    isError: null,
    errorMessage: null,
    data: null,
};

export default function NewChatReducer(state = INIT_STATE, action) {
    switch (action.type) {

        case REQUEST_NEW_CHAT_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case REQUEST_NEW_CHAT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.data,
            };

        case REQUEST_NEW_CHAT_ERROR:
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
