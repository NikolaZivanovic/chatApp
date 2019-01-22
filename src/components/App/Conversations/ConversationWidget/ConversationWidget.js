import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {styles} from './ConversationWidget.styles';

import {withStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Divider from '@material-ui/core/Divider';


const ConversationWidget = (props) => {

    const {classes, conversation, matchUsersToConversation, conversationNameAndParticipantsCheck, handleConversationSelect, selectedConversation} = props;
    const participants = conversationNameAndParticipantsCheck(matchUsersToConversation(conversation));

    return (
        <Fragment>
            {
                conversation.conversation.type === '1' &&
                <Fragment>
                    <ListItem
                        className={selectedConversation === conversation.conversation.conversationId && classes.listItemActive || classes.listItem}
                        onClick={() => handleConversationSelect(conversation, participants)}>
                        <Avatar className={classes.purpleAvatar}>{participants.charAt(0)}</Avatar>
                        <ListItemText primary={participants}/>
                    </ListItem>
                    <Divider/>
                </Fragment>

                ||

                <Fragment>
                    <ListItem
                        className={selectedConversation === conversation.conversation.conversationId && classes.listItemActive || classes.listItem}
                        onClick={() => handleConversationSelect(conversation)}>
                        <Avatar className={classes.orangeAvatar}>GC</Avatar>
                        <ListItemText primary={conversationNameAndParticipantsCheck(conversation.conversation.name)}
                                      secondary={participants}
                        />
                    </ListItem>
                    <Divider/>
                </Fragment>
            }
        </Fragment>
    )
};

ConversationWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    conversation: PropTypes.object.isRequired,
    matchUsersToConversation: PropTypes.func.isRequired,
    conversationNameAndParticipantsCheck: PropTypes.func.isRequired,
    handleConversationSelect: PropTypes.func.isRequired,
    selectedConversation: PropTypes.string,
};

export default withStyles(styles)(ConversationWidget);
