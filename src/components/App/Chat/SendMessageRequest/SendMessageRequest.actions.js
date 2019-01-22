import {ajaxBunq as ajax} from '../../../../util/ajax';
import {
    MESSAGE_REQUEST_IN_PROGRESS,
    MESSAGE_REQUEST_SUCCESS,
    MESSAGE_REQUEST_ERROR,
} from './SendMessageRequest.actionTypes';
import {parseResponseError} from '../../../../util/responseHelper';
import ROUTES from '../../../../config/apiRoutes';
import momentTz from 'moment-timezone';

const sendMessageOnApi = (conversationId, message, senderId) => {
    return ajax.post(ROUTES.CONVERSATION+conversationId+'/message/send', {
        message: message,
        senderId: senderId
    });
};

const date = momentTz(new Date(), "GMT").format();


export const sendMessage = (conversationId, message, senderId) => dispatch => {
    dispatch({type: MESSAGE_REQUEST_IN_PROGRESS});

    return sendMessageOnApi(conversationId, message, senderId)
        .then(success => {
            dispatch({
                type: MESSAGE_REQUEST_SUCCESS,
                data: [{
                    id: success.data.id,
                    senderId: senderId,
                    message: message,
                    timestamp: date.toString(),
                    conversationId: conversationId
                }]
            });
        })
        .catch(error => {
            dispatch({
                type: MESSAGE_REQUEST_ERROR,
                error: parseResponseError(error.response),
            });
        });
};
