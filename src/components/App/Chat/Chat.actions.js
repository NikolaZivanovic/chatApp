import {ajaxBunq as ajax} from '../../../util/ajax';
import {
    GET_MESSAGES_IN_PROGRESS,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_ERROR,
    GET_MESSAGES_RESET_DATA,
} from './Chat.actionTypes';
import {parseResponseError} from '../../../util/responseHelper';
import ROUTES from '../../../config/apiRoutes';


const getMessagesOnApi = (conversationId, offset) => {
    return ajax.get(
        ROUTES.CONVERSATION + conversationId + '/message/limited?limit=20&offset=' + offset
    );
};

export const getMessages = (conversationId, offset) => dispatch => {

    dispatch({type: GET_MESSAGES_IN_PROGRESS});

    return getMessagesOnApi(conversationId, offset)
        .then(success => {
            dispatch({
                type: GET_MESSAGES_SUCCESS,
                data: success.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_MESSAGES_ERROR,
                error: parseResponseError(error.response),
            });
        });
};

export const resetMessagesReducer = () => dispatch => {
    dispatch( { type: GET_MESSAGES_RESET_DATA } );
};

