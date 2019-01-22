import React from 'react';
import PropTypes from 'prop-types';

import {styles} from './MessageInputWidget.styles';

import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send'


const MessageInputWidget = props => {

    const {classes, handleMessageInput, handleMessageSend} = props;

    return (
        <form className={classes.container} onSubmit={handleMessageSend}>
            <TextField
                id="outlined-textarea"
                label="Type a message"
                rowsMax="4"
                multiline
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={(e) => handleMessageInput(e)}
            />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                <Send className={classes.rightIcon}/>
            </Button>
        </form>
    )

};

MessageInputWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    handleMessageInput: PropTypes.func.isRequired,
    handleMessageSend: PropTypes.func.isRequired,
};

export default withStyles(styles)(MessageInputWidget);
