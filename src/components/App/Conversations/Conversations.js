import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ConversationWidget from './ConversationWidget/ConversationWidget';
import MaterialLoader from '../../Common/MaterialLoader/MaterialLoader';
import ErrorWidget from '../../Common/Error/ErrorWidget';


class Conversations extends React.Component {


    mapConversations = conversations => {
        return conversations.map(conversation => (
            <ConversationWidget
                key={conversation.conversation.id}
                conversation={conversation}
                matchUsersToConversation={this.matchUsersToConversation}
                conversationNameAndParticipantsCheck={this.conversationNameAndParticipantsCheck}
                handleConversationSelect={this.props.handleConversationSelect}
                selectedConversation={this.props.selectedConversation}
            />
        ))
    };

    matchUsersToConversation = conversation => {
        let names = '';
        conversation.users.forEach(conversationUser => {
            if (conversationUser.userid !== this.props.UserReducer.id) {
                this.props.UsersReducer.data.forEach(user => {
                    if (conversationUser.userid === user.id) {
                        if (names === '') {
                            names = user.name
                        } else {
                            names = names + ', ' + user.name
                        }
                    }
                })
            }
        });
        return names;
    };

    conversationNameAndParticipantsCheck = values => {
        if (values === '') {
            return 'No participants'
        } else if (values === null) {
            return 'No Name'
        }
        return values
    };

    render() {
        return (
            <Fragment>
                {
                    this.mapConversations(this.props.ConversationsReducer.data)
                }

                {
                    this.props.ConversationsReducer.isLoading &&
                        <MaterialLoader/>
                }

                {
                    this.props.ConversationsReducer.isError &&
                        <ErrorWidget errorMessage={'Something went wrong! Please try again'} isWithoutArrow={true}/>
                }
            </Fragment>
        );
    }
}

Conversations.propTypes = {
    ConversationsReducer: PropTypes.object.isRequired,
    UsersReducer: PropTypes.object.isRequired,
    UserReducer: PropTypes.object.isRequired,
    handleConversationSelect: PropTypes.func.isRequired,
    selectedConversation: PropTypes.string,
};

const mapStateToProps = state => ({
    ConversationsReducer: state.ConversationsReducer,
    UsersReducer: state.UsersReducer,
    UserReducer: state.UserReducer.data.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
