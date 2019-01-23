import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MaterialLoader from '../../Common/MaterialLoader/MaterialLoader';


const MockLoginForm = ({inputChangeHandler, submitHandler, classes, userReducerLoading}) => {

    return (
        <Fragment>
            <h1>Chat App</h1>

            <h2>Enter Id of one of your users</h2>

            <form className={classes.formContainer} autoComplete="off" onSubmit={(event) => submitHandler(event)}>
                <TextField
                    id="standard-name"
                    label="User Id"
                    margin="normal"
                    onChange={event => inputChangeHandler(event)}
                />

                {
                    userReducerLoading &&
                        <MaterialLoader/>

                        ||

                        <Button className={classes.button} color="primary" variant="contained" type='submit'>
                            LOG IN
                        </Button>
                }

            </form>
        </Fragment>
    );
};

MockLoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired,
    userReducerLoading: PropTypes.bool.isRequired
};

export default MockLoginForm;
