import {ajaxBunq as ajax} from '../../../util/ajax';
import {
    REQUEST_NEW_CHAT_IN_PROGRESS,
    REQUEST_NEW_CHAT_SUCCESS,
    REQUEST_NEW_CHAT_ERROR,
} from './NewChat.actionTypes';
import {parseResponseError} from '../../../util/responseHelper';
import ROUTES from '../../../config/apiRoutes';


const createChatOnApi = (users, name) => {
    if(name) {
        return ajax.post(ROUTES.CONVERSATION + 'group', {
            users: users,
            name: name
        });
    } else {
        return ajax.post(ROUTES.CONVERSATION + 'personal', {
            users: users
        });
    }

};

export const createChat = (users, name = '') => dispatch => {
    dispatch({type: REQUEST_NEW_CHAT_IN_PROGRESS});

    return createChatOnApi(users, name)
        .then(success => {
            dispatch({
                type: REQUEST_NEW_CHAT_SUCCESS,
                data: success.data,
            });
        })
        .catch(error => {
            dispatch({
                type: REQUEST_NEW_CHAT_ERROR,
                error: parseResponseError(error.response),
            });
        });
};
