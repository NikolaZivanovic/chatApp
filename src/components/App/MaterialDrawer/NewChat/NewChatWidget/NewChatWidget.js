import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {styles} from './NewChatWidget.styles';

import {withStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';


const NewChatWidget = (props) => {

    const {classes, user, handleNewChatSelection, id} = props;

    return (
        <Fragment>
            <ListItem
                className={classes.listItem}>
                <Avatar className={classes.purpleAvatar}>{user.name.charAt(0)}</Avatar>
                <ListItemText primary={user.name}/>
                <Checkbox
                    onClick={() => handleNewChatSelection(id)}
                    value={user.id}
                    color="primary"
                />
            </ListItem>
            <Divider/>
        </Fragment>
    )
};

NewChatWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleNewChatSelection: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};

export default withStyles(styles)(NewChatWidget);
