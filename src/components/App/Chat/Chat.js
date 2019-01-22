import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getMessages} from './Chat.actions';
import {sendMessage} from './SendMessageRequest/SendMessageRequest.actions';
import {setLastSeen} from './SetLastSeen/SetLastSeen.actions';
import {styles} from './Chat.styles';

import MessageInputWidget from './MessageInputWidget/MessageInputWidget';
import MessageChipWidget from './MessageChipWidget/MessageChipWidget';
import {withStyles} from '@material-ui/core';


class Chat extends React.Component {
    state = {
        offset: 0,
        message: null,
    };

    componentDidMount() {
        this.getMessages();
    }

    componentDidUpdate(prevProps) {
        if (this.state.message === null && prevProps.MessagesReducer.data !== this.props.MessagesReducer.data) {
            this.scrollToBottom()
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView(false);
    };

    getMessages = () => {
        this.props.getMessages(this.props.selectedConversation, this.state.offset);
        this.setState(prevState => ({
            offset: prevState.offset + 10
        }))
    };

    matchUserIdToName = id => {
        let name = '';
        this.props.UsersReducer.forEach(user => {
            if (user.id === id) {
                name = user.name
            }
        });
        return name;
    };

    handleMessageInput = event => {
        this.setState({
            message: event.currentTarget.value,
        })
    };

    handleMessageSend = event => {
        event.preventDefault();
        if (this.state.message) {

            this.sendMessageApi();

            this.setState(prevState => ({
                message: null,
                offset: prevState.offset + 1,
            }));
            event.target.reset();
        }
    };

    sendMessageApi = () => {
        this.props.sendMessage(this.props.selectedConversation, this.state.message, this.props.UserReducer.id)
            .then(() => this.props.setLastSeen(this.props.selectedConversation, this.props.UserReducer.id))
            .catch();
    };

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.messageContainer}>
                    <div className={classes.loadMore} onClick={() => this.getMessages()}>Load More</div>
                    {
                        this.props.MessagesReducer.data &&
                        [...this.props.MessagesReducer.data].reverse().map(message => {
                            return <MessageChipWidget key={message.id} user={this.props.UserReducer} message={message}
                                                      matchUserIdToName={this.matchUserIdToName}/>
                        })
                    }
                    <span ref={el => {
                        this.messagesEnd = el;
                    }}/>
                </div>
                <MessageInputWidget
                    handleMessageInput={this.handleMessageInput}
                    handleMessageSend={this.handleMessageSend}
                />
            </div>
        );
    }
}

Chat.propTypes = {
    classes: PropTypes.object.isRequired,
    UserReducer: PropTypes.object.isRequired,
    UsersReducer: PropTypes.array.isRequired,
    MessagesReducer: PropTypes.object.isRequired,
    getMessages: PropTypes.func.isRequired,
    selectedConversation: PropTypes.string,
    sendMessage: PropTypes.func.isRequired,
    setLastSeen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    UserReducer: state.UserReducer.data.user,
    UsersReducer: state.UsersReducer.data,
    MessagesReducer: state.MessagesReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getMessages,
    sendMessage,
    setLastSeen,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));

