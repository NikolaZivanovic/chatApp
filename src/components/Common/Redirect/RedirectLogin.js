import React from 'react';
import { Redirect } from 'react-router-dom';
import APP_ROUTES from '../../../config/appRoutes';


const RedirectLogin = () => {
    return ( <Redirect to={{ pathname: APP_ROUTES.LOGIN }} /> );
};

export default RedirectLogin;
