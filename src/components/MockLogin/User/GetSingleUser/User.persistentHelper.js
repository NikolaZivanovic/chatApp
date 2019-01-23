import localStorageWrapper from '../../../../util/localStorageWrapper';
import {loginWithToken} from './GetSingleUser.actions';


const LOCAL_STORAGE_USER_DATA_KEY = 'chat_app_user_data';


export const persistLoginData = ({access_token}) => {
    if (access_token) return localStorageWrapper.setItem(LOCAL_STORAGE_USER_DATA_KEY, {access_token});
};

export const getPersistentLoginData = () => localStorageWrapper.getItem(LOCAL_STORAGE_USER_DATA_KEY);

export const clearPersistentLoginData = () => {
    localStorageWrapper.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
};

export const initPersistentLogin = (dispatch) => {
    const persistentUserData = getPersistentLoginData();
    if (!persistentUserData) {
        return Promise.resolve();
    }

    return loginWithToken(dispatch, persistentUserData.access_token);
};

export const getAccessToken = () => {
    const persistentUserData = getPersistentLoginData();
    if (persistentUserData && persistentUserData.access_token) {
        return persistentUserData.access_token;
    }
    return null;
};
