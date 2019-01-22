import {
    GET_LAST_SEEN_IN_PROGRESS,
    GET_LAST_SEEN_SUCCESS,
    GET_LAST_SEEN_ERROR,
} from './GetLastSeen.actionTypes';


const INIT_STATE = {
    isLoading: null,
    isError: null,
    errorMessage: null,
    data: null,
};

export default function LastSeenReducer(state = INIT_STATE, action) {
    switch (action.type) {

        case GET_LAST_SEEN_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case GET_LAST_SEEN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.data,
            };

        case GET_LAST_SEEN_ERROR:
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
