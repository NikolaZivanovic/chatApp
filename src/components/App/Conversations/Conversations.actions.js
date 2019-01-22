import {ajaxBunq as ajax} from '../../../util/ajax';
import {
    GET_ALL_CONVERSATIONS_IN_PROGRESS,
    GET_ALL_CONVERSATIONS_SUCCESS,
    GET_ALL_CONVERSATIONS_ERROR,
} from './Conversations.actionTypes';
import {parseResponseError} from '../../../util/responseHelper';
import ROUTES from '../../../config/apiRoutes';


const getAllConversationsOnApi = userId => {
    return ajax.get(
        ROUTES.GET_ALL_CONVERSATIONS + userId
    );
};

export const getAllConversations = userId => dispatch => {

    dispatch({type: GET_ALL_CONVERSATIONS_IN_PROGRESS});

    return getAllConversationsOnApi(userId)
        .then(success => {
            dispatch({
                type: GET_ALL_CONVERSATIONS_SUCCESS,
                data: success.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_ALL_CONVERSATIONS_ERROR,
                error: parseResponseError(error.response),
            });
        });
};

