import {ajaxBunq as ajax} from '../../../util/ajax';
import {
    GET_ALL_USERS_IN_PROGRESS,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_ERROR,
} from './GetAllUsers.actionTypes';
import {parseResponseError} from '../../../util/responseHelper';
import ROUTES from '../../../config/apiRoutes';


const getAllUsersOnApi = () => {
    return ajax.get(
        ROUTES.GET_ALL_USERS
    );
};

export const getAllUsers = () => dispatch => {

    dispatch({type: GET_ALL_USERS_IN_PROGRESS});

    return getAllUsersOnApi()
        .then(success => {
            dispatch({
                type: GET_ALL_USERS_SUCCESS,
                data: success.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_ALL_USERS_ERROR,
                error: parseResponseError(error.response),
            });
        });
};

