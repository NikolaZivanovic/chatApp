import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const MockLoginForm = ({inputChangeHandler, submitHandler, classes}) => {

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
                <Button className={classes.button} color="primary" variant="contained" type='submit'>
                    LOG IN
                </Button>
            </form>
        </Fragment>
    );
};

MockLoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired,
};

export default MockLoginForm;
