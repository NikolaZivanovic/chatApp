import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from './Logout.actions';

import ExitToApp from '@material-ui/icons/ExitToApp';


class Logout extends Component {

    onLogoutClickHandler = () => {
        localStorage.removeItem('chat_app_user_data');
        this.props.logout();
    };

    render() {
        return (
            <ExitToApp onClick={this.onLogoutClickHandler}/>
        );
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired,
    LogoutReducer: PropTypes.object.isRequired,
};

const mapStateToProps = state =>({
    LogoutReducer: state.LogoutReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators( {
    logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
