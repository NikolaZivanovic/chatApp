import {
  LOGOUT_IN_PROGRESS,
  LOGOUT_SUCCESS,
} from './Logout.actionTypes';
import {push} from 'react-router-redux';
import APP_ROUTES from '../../../config/appRoutes';


export const logout = () => dispatch => {
  dispatch({type: LOGOUT_IN_PROGRESS});
  dispatch({type: LOGOUT_SUCCESS});
  dispatch(push(APP_ROUTES.LOGIN));
};
