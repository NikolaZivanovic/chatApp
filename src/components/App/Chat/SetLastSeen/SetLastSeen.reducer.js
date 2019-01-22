import {
    SET_LAST_SEEN_IN_PROGRESS,
    SET_LAST_SEEN_SUCCESS,
    SET_LAST_SEEN_ERROR,
} from './SetLastSeen.actionTypes';

const INIT_STATE = {
    isLoading: null,
    isError: null,
    errorMessage: null,
    data: null,
};

export default function SetLastSeenReducer(state = INIT_STATE, action) {
    switch (action.type) {

        case SET_LAST_SEEN_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case SET_LAST_SEEN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.data,
            };

        case SET_LAST_SEEN_ERROR:
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
