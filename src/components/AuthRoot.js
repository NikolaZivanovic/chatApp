import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import Loadable from 'react-loadable';
import Loader from './Common/Loader/Loader';
import APP_ROUTES from '../config/appRoutes';
import RedirectHome from './Common/Redirect/RedirectHome';


const App = Loadable.Map({
    loader: {
        App: () => import('./App/App'),
    },
    render(loaded, props) {
        const App = loaded.App.default;
        return <App {...props} />;
    },
    loading: Loader,
});

const NotFoundPage = Loadable({
    loader: () => import('./NotFoundPage'),
    loading: Loader,
});

class AuthRoot extends Component {
    render() {

        return (
            <React.Fragment>

                <main className="main">
                    <Switch>
                        <Route exact path={APP_ROUTES.HOME} render={() => <App userName={this.props.userName}/>}/>
                        <Route path={APP_ROUTES.LOGIN} component={RedirectHome}/>
                        <Route component={NotFoundPage}/>
                    </Switch>

                </main>

            </React.Fragment>
        );
    }
}

AuthRoot.propTypes = {
    userName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    userName: (state.UserReducer.data && state.UserReducer.data.user && state.UserReducer.data.user.name),
});

export default withRouter(connect(mapStateToProps)(AuthRoot));
