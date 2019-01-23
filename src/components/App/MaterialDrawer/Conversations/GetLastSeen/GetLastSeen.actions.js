import {ajaxBunq as ajax} from '../../../../../util/ajax';
import {
    GET_LAST_SEEN_IN_PROGRESS,
    GET_LAST_SEEN_SUCCESS,
    GET_LAST_SEEN_ERROR,
} from './GetLastSeen.actionTypes';
import {parseResponseError} from '../../../../../util/responseHelper';
import ROUTES from '../../../../../config/apiRoutes';


const getLastSeenOnApi = (conversationId, userId) => {
    return ajax.get(
        ROUTES.CONVERSATION + conversationId + '/lastseen/' + userId
    );
};

export const getLastSeen = (conversationId, userId) => dispatch => {

    dispatch({type: GET_LAST_SEEN_IN_PROGRESS});

    return getLastSeenOnApi(conversationId, userId)
        .then(success => {
            dispatch({
                type: GET_LAST_SEEN_SUCCESS,
                data: success.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_LAST_SEEN_ERROR,
                error: parseResponseError(error.response),
            });
        });
};

