import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';

import Loader from './Common/Loader/Loader';
import APP_ROUTES from '../config/appRoutes';
import RedirectLogin from './Common/Redirect/RedirectLogin';


const Login = Loadable.Map({
    loader: {
        Login: () => import('./MockLogin/MockLogin'),
    },
    render(loaded, props) {
        const Login = loaded.Login.default;
        return <Login {...props} />;
    },
    loading: Loader,
});

class NonAuthRoot extends Component {
    render() {
        return (
            <React.Fragment>

                <Switch>
                    <Route path={APP_ROUTES.LOGIN} component={Login}/>
                    <Route component={RedirectLogin}/>
                </Switch>

            </React.Fragment>
        );
    }
}

export default NonAuthRoot;
