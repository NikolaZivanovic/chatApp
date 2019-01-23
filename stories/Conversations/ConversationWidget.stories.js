import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreProvider from '../StoreProvider';
import ConversationWidget from '../../src/components/App/MaterialDrawer/Conversations/ConversationWidget/ConversationWidget';
import {MemoryRouter as Router} from 'react-router-dom';

const conversation = {
        conversation: {
            id: '4',
            conversationId: '4',
            is_owner: '0',
            userid: '4',
            status: '1',
            lastseen: null,
            name: 'Group Chaaat',
            type: '2'
        },
        users: [
            {
                id: '31',
                conversationId: '4',
                is_owner: '0',
                userid: '1',
                status: null,
                lastseen: '2018-11-14 12:38:19'
            },
            {
                id: '32',
                conversationId: '4',
                is_owner: '0',
                userid: '2',
                status: null,
                lastseen: null
            },
            {
                id: '33',
                conversationId: '4',
                is_owner: '0',
                userid: '3',
                status: null,
                lastseen: null
            },
            {
                id: '34',
                conversationId: '4',
                is_owner: '0',
                userid: '4',
                status: null,
                lastseen: null
            }
        ]
    };

storiesOf( 'Conversations/ConversationWidget', module )
    .addDecorator(story => <StoreProvider story={story()}/>)
    .addDecorator( storyFn => <Router><div className="wrapper">{storyFn()}</div></Router> )
    .add( 'smallWrapper', () => <div className="wrapper wrapper--small"><ConversationWidget matchUsersToConversation={()=>{}} conversationNameAndParticipantsCheck={()=>{}} conversation={conversation}/></div> )
    .add( 'mediumWrapper', () => <div className="wrapper wrapper--medium"><ConversationWidget matchUsersToConversation={()=>{}} conversationNameAndParticipantsCheck={()=>{}} conversation={conversation}/></div> )
    .add( 'bigWrapper', () => <div className="wrapper wrapper--biggest"><ConversationWidget matchUsersToConversation={()=>{}} conversationNameAndParticipantsCheck={()=>{}} conversation={conversation}/></div> );
