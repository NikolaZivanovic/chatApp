import {ajaxBunq as ajax} from '../../../../util/ajax';
import {
    GET_NEW_MESSAGES_IN_PROGRESS,
    GET_NEW_MESSAGES_SUCCESS,
    GET_NEW_MESSAGES_ERROR,
} from './NewMessages.actionTypes';
import {parseResponseError} from '../../../../util/responseHelper';
import ROUTES from '../../../../config/apiRoutes';


const getNewMessagesOnApi = (conversationId, lastMessageId) => {
    return ajax.get(
        ROUTES.CONVERSATION + conversationId + '/new/' + lastMessageId
    );
};

export const getNewMessages = (conversationId, lastMessageId) => dispatch => {

    dispatch({type: GET_NEW_MESSAGES_IN_PROGRESS});

    return getNewMessagesOnApi(conversationId, lastMessageId)
        .then(success => {
            dispatch({
                type: GET_NEW_MESSAGES_SUCCESS,
                data: success.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_NEW_MESSAGES_ERROR,
                error: parseResponseError(error.response),
            });
        });
};
