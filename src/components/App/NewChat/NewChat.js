import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NewChatWidget from './NewChatWidget/NewChatWidget';
import {styles} from './NewChat.styles';

import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Divider from '@material-ui/core/Divider/Divider';
import {withStyles} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField/TextField';


class NewChat extends React.Component {


    mapUsers = (users, checkBoxState) => {
        return users.map(user => {
            return Object.keys(checkBoxState).map(key => {
                if (user.id !== this.props.UserReducer.id && user.id === key) {
                    return <NewChatWidget key={user.id} user={user} id={key}
                                          handleNewChatSelection={this.props.handleNewChatSelection}/>
                }
            })
        })
    };

    isGroupChat = selectedCheckBoxes => {
        let counter = 0;
        Object.values(selectedCheckBoxes).forEach(value => {
            if (value) {
                counter++
            }
        });
        return counter;
    };

    render() {

        const {classes} = this.props;

        return (
            <Fragment>
                {
                    this.isGroupChat(this.props.checkBoxState) > 2 &&
                    <Fragment>
                        <ListItem>
                            <TextField
                                className={classes.textField}
                                id="outlined-textarea"
                                label="Chat Name"
                                margin="normal"
                                variant="outlined"
                                onChange={event => this.props.handleChatNameInput(event)}
                            />
                        </ListItem>
                        <Divider/>
                    </Fragment>

                }

                {
                    this.mapUsers(this.props.UsersReducer.data, this.props.checkBoxState)
                }

                <ListItem
                    onClick={() => {this.props.handleNewChatSubmit()}}
                    className={this.props.isCheckBoxSelected(this.props.checkBoxState) && classes.listItem || classes.listItemBlocked}>
                    <Add/>
                    <ListItemText>Create New Conversation</ListItemText>
                </ListItem>
                <Divider/>

            </Fragment>
        );
    }
}

NewChat.propTypes = {
    classes: PropTypes.object.isRequired,
    ConversationsReducer: PropTypes.object.isRequired,
    UsersReducer: PropTypes.object.isRequired,
    UserReducer: PropTypes.object.isRequired,
    checkBoxState: PropTypes.object.isRequired,
    handleNewChatSelection: PropTypes.func.isRequired,
    isCheckBoxSelected: PropTypes.func.isRequired,
    handleChatNameInput: PropTypes.func.isRequired,
    handleNewChatSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    ConversationsReducer: state.ConversationsReducer,
    UsersReducer: state.UsersReducer,
    UserReducer: state.UserReducer.data.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewChat));
