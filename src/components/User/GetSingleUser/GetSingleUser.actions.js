import { ajaxBunq as ajax } from '../../../util/ajax';
import {
  GET_SINGLE_USER_IN_PROGRESS,
  AUTO_GET_SINGLE_USER_SUCCESS,
  AUTO_GET_SINGLE_USER_ERROR,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_ERROR
} from './GetSingleUser.actionTypes';
import { push } from 'react-router-redux';
import { parseResponseError } from '../../../util/responseHelper';
import { persistLoginData, clearPersistentLoginData } from './User.persistentHelper';
import ROUTES from '../../../config/apiRoutes';
import APP_ROUTES from '../../../config/appRoutes';


const loginApi = ( id ) => {
  return ajax.get(
    ROUTES.GET_SINGLE_USER + id
  );
};

const getUserDataWithToken = ( access_token ) => {
  return ajax.get(
    ROUTES.GET_SINGLE_USER + access_token,
  );
};

export const login = ( id ) => dispatch => {

  let data = {};

  dispatch( { type: GET_SINGLE_USER_IN_PROGRESS } );

  return loginApi( id )
    .then( loginSuccess => {
      data.user = loginSuccess.data;

      persistLoginData( {access_token: data.user.id} );

      dispatch( {
        type: GET_SINGLE_USER_SUCCESS,
        payload: {
          loadedUserData: data.user,
        }
      } );
    } )
    .catch( error => {
      clearPersistentLoginData();

      dispatch( {
        type: GET_SINGLE_USER_ERROR,
        error: parseResponseError( error.response ),
      } );
    } );
};

export const loginWithToken = ( dispatch, access_token ) => {
  dispatch( { type: GET_SINGLE_USER_IN_PROGRESS } );

  return getUserDataWithToken(access_token)
    .then( success => {
      dispatch( {
        type: AUTO_GET_SINGLE_USER_SUCCESS,
        payload: {
          loadedUserData: success.data,
        }
      } );
      return success;
    } )
    .catch( error => {
      clearPersistentLoginData();

      dispatch( {
        type: AUTO_GET_SINGLE_USER_ERROR,
        error: parseResponseError( error.response ),
      } );

      dispatch( push( APP_ROUTES.LOGIN ) );
    } );
};
