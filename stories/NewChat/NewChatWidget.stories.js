import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreProvider from '../StoreProvider';
import NewChatWidget from '../../src/components/App/NewChat/NewChatWidget/NewChatWidget';
import {MemoryRouter as Router} from 'react-router-dom';

const user = {id:'1', name:'Wessel'};

storiesOf( 'NewChat/NewChatWidget', module )
    .addDecorator(story => <StoreProvider story={story()}/>)
    .addDecorator( storyFn => <Router><div className="wrapper">{storyFn()}</div></Router> )
    .add( 'smallWrapper', () => <div className="wrapper wrapper--small"><NewChatWidget user={user} handleNewChatSelection={()=>{}} id={'1'}/></div> )
    .add( 'mediumWrapper', () => <div className="wrapper wrapper--medium"><NewChatWidget user={user} handleNewChatSelection={()=>{}} id={'1'}/></div> )
    .add( 'bigWrapper', () => <div className="wrapper wrapper--biggest"><NewChatWidget user={user} handleNewChatSelection={()=>{}} id={'1'}/></div> );
