import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreProvider from '../../StoreProvider';
import MessageChipWidget from '../../../src/components/App/Chat/MessageChipWidget/MessageChipWidget';
import {MemoryRouter as Router} from 'react-router-dom';

const message = "This is a test message!";
const user = {id:'1', name:'Wessel'};

storiesOf( 'Chat/MessageChipWidget', module )
    .addDecorator(story => <StoreProvider story={story()}/>)
    .addDecorator( storyFn => <Router><div className="wrapper">{storyFn()}</div></Router> )
    .add( 'smallWrapper', () => <div className="wrapper wrapper--small"><MessageChipWidget user={user} message={message} matchUserIdToName={()=>{}}/></div> )
    .add( 'mediumWrapper', () => <div className="wrapper wrapper--medium"><MessageChipWidget user={user} message={message} matchUserIdToName={()=>{}}/></div> )
    .add( 'bigWrapper', () => <div className="wrapper wrapper--biggest"><MessageChipWidget user={user} message={message} matchUserIdToName={()=>{}}/></div> );
