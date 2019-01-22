import {ajaxBunq as ajax} from '../../../../util/ajax';
import {
    SET_LAST_SEEN_IN_PROGRESS,
    SET_LAST_SEEN_SUCCESS,
    SET_LAST_SEEN_ERROR,
} from './SetLastSeen.actionTypes';
import {parseResponseError} from '../../../../util/responseHelper';
import ROUTES from '../../../../config/apiRoutes';


const setLastSeenOnApi = (conversationId, userId) => {
    return ajax.put(
        ROUTES.CONVERSATION + conversationId + '/seen/' + userId
    );
};

export const setLastSeen = (conversationId, userId) => dispatch => {

    dispatch({type: SET_LAST_SEEN_IN_PROGRESS});

    return setLastSeenOnApi(conversationId, userId)
        .then(success => {
            dispatch({
                type: SET_LAST_SEEN_SUCCESS,
                data: success.data,
            });
        })
        .catch(error => {
            dispatch({
                type: SET_LAST_SEEN_ERROR,
                error: parseResponseError(error.response),
            });
        });
};
