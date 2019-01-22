import React from 'react';
import configureStore from '../src/store/configureStore';
import { Provider as ReduxProvider } from 'react-redux';


const store = configureStore();


function StoreProvider ({story}) {
    return (
        <ReduxProvider store={store}>
            {story}
        </ReduxProvider>
    );
}

export default StoreProvider;
