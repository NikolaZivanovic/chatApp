import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreProvider from '../../StoreProvider';
import MessageInputWidget from '../../../src/components/App/Chat/MessageInputWidget/MessageInputWidget';
import {MemoryRouter as Router} from 'react-router-dom';


storiesOf( 'Chat/MessageInputWidget', module )
    .addDecorator(story => <StoreProvider story={story()}/>)
    .addDecorator( storyFn => <Router><div className="wrapper">{storyFn()}</div></Router> )
    .add( 'smallWrapper', () => <div className="wrapper wrapper--small"><MessageInputWidget handleMessageInput={()=>{}} handleMessageSend={()=>{}}/></div> )
    .add( 'mediumWrapper', () => <div className="wrapper wrapper--medium"><MessageInputWidget handleMessageInput={()=>{}} handleMessageSend={()=>{}}/></div> )
    .add( 'bigWrapper', () => <div className="wrapper wrapper--biggest"><MessageInputWidget handleMessageInput={()=>{}} handleMessageSend={()=>{}}/></div> );
