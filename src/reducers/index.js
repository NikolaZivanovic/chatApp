import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {LOGOUT_SUCCESS} from '../components/Common/Logout/Logout.actionTypes';
import LogoutReducer from '../components/Common/Logout/Logout.reducer';
import UserReducer from '../components/MockLogin/User/GetSingleUser/GetSingleUser.reducer';
import UsersReducer from '../components/MockLogin/User/GetAllUsers/GetAllUsers.reducer';
import ConversationsReducer from '../components/App/MaterialDrawer/Conversations/Conversations.reducer';
import MessagesReducer from '../components/App/Chat/Chat.reducer';
import SendMessageReducer from '../components/App/Chat/SendMessageRequest/SendMessageRequest.reducer';
import NewChatReducer from '../components/App/MaterialDrawer/NewChat/NewChat.reducer';
import NewMessageReducer from '../components/App/Chat/NewMessagesRequest/NewMessages.reducer';
import LastSeenReducer from '../components/App/MaterialDrawer/Conversations/GetLastSeen/GetLastSeen.reducer';

const rootReducer = combineReducers({
    UserReducer,
    UsersReducer,
    ConversationsReducer,
    MessagesReducer,
    SendMessageReducer,
    LastSeenReducer,
    NewChatReducer,
    NewMessageReducer,
    LogoutReducer,
    routing: routerReducer,
});

export default function (state, action) { // reset all reducers on Logout event
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }
    return rootReducer(state, action);
}
