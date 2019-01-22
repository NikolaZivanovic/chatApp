import {
    GET_ALL_USERS_IN_PROGRESS,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_ERROR,
} from './GetAllUsers.actionTypes';


const INIT_STATE = {
    isLoading: null,
    isError: null,
    errorMessage: null,
    data: null,
};

export default function UsersReducer (state = INIT_STATE, action) {
    switch (action.type) {

        case GET_ALL_USERS_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.data,
            };

        case GET_ALL_USERS_ERROR:
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
