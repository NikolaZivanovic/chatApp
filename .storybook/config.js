import {addDecorator, configure} from '@storybook/react';
import React from 'react';
import {BackgroundColor} from 'react-storybook-decorator-background';
import {BACKGROUND_COLORS} from './backgroundColors.util';
import '../src/styles/styles.scss';


// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

addDecorator(story => <BackgroundColor colors={BACKGROUND_COLORS} story={story}/>);

configure(loadStories, module);
