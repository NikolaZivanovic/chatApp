import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import momentTz from 'moment-timezone';
import classNames from 'classnames';

import Chat from './Chat/Chat';
import {getAllUsers} from '../User/GetAllUsers/GetAllUsers.actions';
import {getAllConversations} from './Conversations/Conversations.actions';
import {resetMessagesReducer} from './Chat/Chat.actions';
import {createChat} from './NewChat/NewChat.actions';
import {getNewMessages} from './Chat/NewMessagesRequest/NewMessages.actions';
import {getLastSeen} from './Conversations/GetLastSeen/GetLastSeen.actions';
import MaterialDrawer from './MaterialDrawer/MaterialDrawer';
import {styles} from './App.styles';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Replay from '@material-ui/icons/Replay'


class App extends React.Component {
    state = {
        drawerOpen: true,
        anchor: 'left',
        drawerContent: false,
        selectedConversation: null,
        selectedConversationName: 'Chat App',
        checkBoxes: null,
        chatName: null,
        rotation: 0,
    };

    componentDidMount() {
        this.props.getAllUsers();
        this.props.getAllConversations(this.props.UserReducer.data.user.id);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.checkBoxes === null &&
            prevProps.UsersReducer.data !== this.props.UsersReducer.data ||
            prevState.drawerContent !== this.state.drawerContent) {

            this.createInitialNewChatState()

        } else if (prevProps.NewChatReducer.data !== this.props.NewChatReducer.data) {

            this.props.getAllConversations(this.props.UserReducer.data.user.id);
            this.createInitialNewChatState()

        }
    }

    handleDrawerToggle = () => {
        if (this.state.drawerContent) {
            return this.setState({
                drawerContent: false,
                checkBoxes: null,
                chatName: null,
            });
        }
        this.setState(prevState => ({
            drawerOpen: !prevState.drawerOpen,
            drawerContent: false,
            checkBoxes: null,
            chatName: null,
        }));
    };

    handleNewChat = () => {
        this.setState({
            drawerContent: true,
        })
    };

    handleConversationSelect = (conversation, participants) => {
        if (conversation.conversation.conversationId !== this.state.selectedConversation) {

            this.props.resetMessagesReducer();

            if (conversation.users.length < 3) {
                this.handleGetLastSeen(conversation)
            }
        }
        this.setState({
            selectedConversation: conversation.conversation.conversationId,
            selectedConversationName: conversation.conversation.name && conversation.conversation.name || participants
        })
    };

    handleGetLastSeen = conversation => {
        conversation.users.forEach(user => {
            if (user.userid !== this.props.UserReducer.data.user.id) {
                this.props.getLastSeen(conversation.conversation.conversationId, user.userid);
            }
        })
    };

    createInitialNewChatState = () => {
        this.props.UsersReducer.data.forEach(user => {
            if (user.id !== this.props.UserReducer.data.user.id) {
                this.setState(prevState => ({
                    checkBoxes: {
                        ...prevState.checkBoxes,
                        [user.id]: false,
                    }
                }))
            } else {
                this.setState(prevState => ({
                    checkBoxes: {
                        ...prevState.checkBoxes,
                        [user.id]: true,
                    }
                }))
            }
        })
    };

    handleNewChatSelection = selector => {
        this.setState(prevState => ({
            checkBoxes: {
                ...prevState.checkBoxes,
                [selector]: !prevState.checkBoxes[selector],
            }
        }))
    };

    handleNewChatSubmit = () => {
        let users = [];

        if (this.isCheckBoxSelected(this.state.checkBoxes)) {

            Object.keys(this.state.checkBoxes).forEach(checkBox => {
                if (this.state.checkBoxes[checkBox]) {
                    users.push(checkBox)
                }
            });

            this.props.createChat(users.toString(), this.state.chatName);

            this.setState({
                drawerOpen: true,
                checkBoxes: null,
                chatName: null,
            })
        }
    };

    handleChatNameInput = event => {
        this.setState({
            chatName: event.currentTarget.value
        })
    };

    isCheckBoxSelected = checkBoxState => {
        let value = -1;

        Object.values(checkBoxState).forEach(state => {
            if (state === true) {
                value++
            }
        });
        return value
    };

    reloadMessagesHandler = () => {
        if (this.state.selectedConversation !== null) {
            let newRotation = this.state.rotation - 360;
            let lastMessage = this.props.MessagesReducer.data[0].id;
            this.props.getNewMessages(this.state.selectedConversation, lastMessage);
            this.setState({
                rotation: newRotation,
            });
        }
    };

    render() {

        const {classes, theme} = this.props;
        const {drawerOpen, anchor, drawerContent} = this.state;

        let rotateClass = classes.reload;
        const rotation = this.state.rotation;
        const rot = {transform: `rotate(${rotation}deg)`};

        let lastSeen = momentTz.tz(
            this.props.LastSeenReducer.data &&
            this.props.LastSeenReducer.data.lastseen !== null &&
            this.props.LastSeenReducer.data.lastseen, 'GMT').format();




        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: drawerOpen,
                            [classes[`appBarShift-${anchor}`]]: drawerOpen,
                        })}
                    >

                        <Toolbar disableGutters={!drawerOpen}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classNames(classes.menuButton, drawerOpen && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>

                            <div className={classes.headerContainer}>

                                <Typography variant="title" color="inherit" noWrap>
                                    {this.state.selectedConversationName}
                                </Typography>

                                {
                                    this.props.LastSeenReducer.data &&
                                    this.props.LastSeenReducer.data.lastseen !== null &&
                                    <span>Last seen: {moment(lastSeen).fromNow()}</span>
                                }

                                <Replay style={rot} className={rotateClass}
                                        onClick={() => this.reloadMessagesHandler()}/>

                            </div>

                        </Toolbar>
                    </AppBar>

                    {

                        <MaterialDrawer
                            usersReducer={this.props.UserReducer}
                            handleNewChatSelection={this.handleNewChatSelection}
                            selectedConversation={this.state.selectedConversation}
                            handleConversationSelect={this.handleConversationSelect}
                            checkBoxes={this.state.checkBoxes}
                            classes={classes}
                            conversationsReducer={this.props.ConversationsReducer}
                            drawerContent={drawerContent}
                            handleChatNameInput={this.handleChatNameInput}
                            handleDrawerToggle={this.handleDrawerToggle}
                            handleNewChat={this.handleNewChat}
                            handleNewChatSubmit={this.handleNewChatSubmit}
                            isCheckBoxSelected={this.isCheckBoxSelected}
                            newChatReducer={this.props.NewChatReducer}
                            drawerOpen={drawerOpen}
                            theme={theme}
                        />

                    }

                    <main
                        className={classNames(classes.content, classes[`content-${anchor}`], {
                            [classes.contentShift]: drawerOpen,
                            [classes[`contentShift-${anchor}`]]: drawerOpen,
                        })}
                    >

                        {
                            this.state.selectedConversation !== null &&
                            <Chat
                                key={this.state.selectedConversation}
                                selectedConversation={this.state.selectedConversation}
                            />
                        }

                    </main>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    getAllConversations: PropTypes.func.isRequired,
    UsersReducer: PropTypes.object.isRequired,
    ConversationsReducer: PropTypes.object.isRequired,
    UserReducer: PropTypes.object.isRequired,
    resetMessagesReducer: PropTypes.func.isRequired,
    createChat: PropTypes.func.isRequired,
    NewChatReducer: PropTypes.object.isRequired,
    getNewMessages: PropTypes.func.isRequired,
    MessagesReducer: PropTypes.object.isRequired,
    getLastSeen: PropTypes.func.isRequired,
    LastSeenReducer: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    UserReducer: state.UserReducer,
    UsersReducer: state.UsersReducer,
    ConversationsReducer: state.ConversationsReducer,
    NewChatReducer: state.NewChatReducer,
    MessagesReducer: state.MessagesReducer,
    LastSeenReducer: state.LastSeenReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllUsers,
    getAllConversations,
    resetMessagesReducer,
    createChat,
    getNewMessages,
    getLastSeen,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(App));
