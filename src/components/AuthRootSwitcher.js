import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import Loader from './Common/Loader/Loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';


const AuthRoot = Loadable({
    loader: () => import('./AuthRoot'),
    loading: Loader,
});

const NonAuthRoot = Loadable({
    loader: () => import('./NonAuthRoot'),
    loading: Loader,
});

const isUserLoggedInSelector = userData => {
    if (userData && !userData.user) {
        return userData.user
    }
    return !!userData
};

const AuthRootSwitcher = ({isUserLoggedIn}) => {
    if (isUserLoggedIn) {
        return <AuthRoot/>;
    } else {
        return <NonAuthRoot/>;
    }
};

AuthRootSwitcher.propTypes = {
    isUserLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isUserLoggedIn: isUserLoggedInSelector(state.UserReducer.data),
});

export default withRouter(connect(mapStateToProps)(AuthRootSwitcher));
