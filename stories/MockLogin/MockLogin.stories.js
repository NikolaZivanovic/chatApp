import React from 'react';
import {storiesOf} from '@storybook/react';
import StoreProvider from '../StoreProvider';
import MockLoginForm from '../../src/components/MockLogin/MockLoginForm/MockLoginForm';
import {MemoryRouter as Router} from 'react-router-dom';

storiesOf('MockLogin/LoginForm', module)
    .addDecorator(story => <StoreProvider story={story()}/>)
    .addDecorator(storyFn => <Router><div className="wrapper">{storyFn()}</div></Router>)
    .add('smallWrapper', () => <div className="wrapper wrapper--small"><MockLoginForm inputChangeHandler={()=>{}} submitHandler={()=>{}}/></div>)
    .add('mediumWrapper', () => <div className="wrapper wrapper--medium"><MockLoginForm inputChangeHandler={()=>{}} submitHandler={()=>{}}/></div>)
    .add('bigWrapper', () => <div className="wrapper wrapper--biggest"><MockLoginForm inputChangeHandler={()=>{}} submitHandler={()=>{}}/></div>);
