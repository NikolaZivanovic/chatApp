import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ErrorWidget from '../Common/Error/ErrorWidget';
import MockLoginForm from './MockLoginForm/MockLoginForm'
import {login} from './User/GetSingleUser/GetSingleUser.actions';
import {styles} from './MockLogin.styles';

import {withStyles} from '@material-ui/core/styles';


class MockLogin extends Component {
    state = {
        inputValue: ''
    };

    inputChangeHandler = event => {
        this.setState({
            inputValue: event.currentTarget.value,
        });
    };

    submitHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        this.props.login(this.state.inputValue);
    };

    render() {

        const {classes, UserReducer} = this.props;

        return (
            <div className={classes.container}>

                <MockLoginForm
                    inputChangeHandler={this.inputChangeHandler}
                    submitHandler={this.submitHandler}
                    classes={classes}
                    userReducerLoading={UserReducer.isLoading}
                />

                {
                    UserReducer.isError ||
                    UserReducer.data &&
                    UserReducer.data.user === false &&
                    <ErrorWidget
                        errorMessage={'Something went wrong! Please try again'}
                        isWithoutArrow={true}
                    />
                }

            </div>
        );
    }
}

MockLogin.propTypes = {
    classes: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    UserReducer: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    UserReducer: state.UserReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    login
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MockLogin));
