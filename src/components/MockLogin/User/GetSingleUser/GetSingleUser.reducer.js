import {
    GET_SINGLE_USER_IN_PROGRESS,
    GET_SINGLE_USER_SUCCESS,
    GET_SINGLE_USER_ERROR,
    AUTO_GET_SINGLE_USER_SUCCESS,
    AUTO_GET_SINGLE_USER_ERROR,
} from './GetSingleUser.actionTypes';


const INIT_STATE = {
    isLoading: false,
    isError: false,
    errorMessage: null,
    data: null,
};

export default function UserReducer(state = INIT_STATE, action) {
    switch (action.type) {

        case GET_SINGLE_USER_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case GET_SINGLE_USER_SUCCESS:
        case AUTO_GET_SINGLE_USER_SUCCESS:   // intentional fall-through
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: {
                    user: action.payload.loadedUserData,
                },
            };

        case GET_SINGLE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: null,
                errorMessage: action.error,
            };

        case AUTO_GET_SINGLE_USER_ERROR:
            return {...INIT_STATE};

        default:
            return state;
    }
}
