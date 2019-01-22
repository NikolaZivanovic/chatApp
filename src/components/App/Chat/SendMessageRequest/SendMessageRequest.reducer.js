import {
    MESSAGE_REQUEST_IN_PROGRESS,
    MESSAGE_REQUEST_SUCCESS,
    MESSAGE_REQUEST_ERROR
} from './SendMessageRequest.actionTypes';


const INIT_STATE = {
    isLoading: null,
    isError: null,
    errorMessage: null,
    data: null,
};

export default function MessageSendReducer(state = INIT_STATE, action) {
    switch (action.type) {

        case MESSAGE_REQUEST_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case MESSAGE_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.data,
            };

        case MESSAGE_REQUEST_ERROR:
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
