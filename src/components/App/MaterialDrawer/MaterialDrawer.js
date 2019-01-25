import React from 'react';
import PropTypes from 'prop-types';

import ErrorWidget from '../../Common/Error/ErrorWidget';
import MaterialLoader from '../../Common/MaterialLoader/MaterialLoader';
import NewChat from './NewChat/NewChat';
import Conversations from './Conversations/Conversations';
import Logout from '../../Common/Logout/Logout';
import {styles} from '../App.styles';

import Drawer from '@material-ui/core/Drawer/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {withStyles} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';


const MaterialDrawer = ({
                            classes,
                            handleNewChat,
                            handleDrawerToggle,
                            drawerContent,
                            conversationsReducer,
                            usersReducer,
                            handleConversationSelect,
                            selectedConversation,
                            checkBoxes,
                            handleNewChatSelection,
                            isCheckBoxSelected,
                            handleChatNameInput,
                            handleNewChatSubmit,
                            newChatReducer,
                            drawerOpen,
                            theme
                        }) => {

    return (
        <Drawer
            variant="persistent"
            anchor='left'
            open={drawerOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >

            <div className={classes.drawerHeader}>
                <Tooltip title="Logout" placement="bottom">
                    <IconButton>
                        <Logout/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="New Chat" placement="bottom">
                    <IconButton onClick={handleNewChat}>
                        <ChatIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Back" placement="bottom">
                    <IconButton onClick={handleDrawerToggle}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </Tooltip>
            </div>
            <Divider/>

            {
                !drawerContent &&
                conversationsReducer.data &&
                usersReducer.data &&
                <List>
                    <Conversations
                        handleConversationSelect={handleConversationSelect}
                        selectedConversation={selectedConversation}
                    />
                </List>
            }

            {
                !drawerContent &&
                conversationsReducer.isLoading &&
                <MaterialLoader/>
            }

            {
                !drawerContent &&
                conversationsReducer.isError &&
                <ErrorWidget errorMessage={'Something went wrong! Please try again'} isWithoutArrow={true}/>
            }

            {
                drawerContent &&
                checkBoxes !== null &&
                conversationsReducer.data &&
                usersReducer.data &&
                <List>
                    <NewChat
                        checkBoxState={checkBoxes}
                        handleNewChatSelection={handleNewChatSelection}
                        isCheckBoxSelected={isCheckBoxSelected}
                        handleChatNameInput={handleChatNameInput}
                        handleNewChatSubmit={handleNewChatSubmit}
                    />
                </List>

            }

            {
                drawerContent &&
                checkBoxes !== null &&
                newChatReducer.isLoading &&
                <MaterialLoader/>
            }

            {
                drawerContent &&
                checkBoxes !== null &&
                newChatReducer.isError &&
                <ErrorWidget errorMessage={'Something went wrong! Please try again'} isWithoutArrow={true}/>
            }

        </Drawer>
    )

};

MaterialDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    handleNewChat: PropTypes.func.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired,
    drawerContent: PropTypes.bool.isRequired,
    conversationsReducer: PropTypes.object.isRequired,
    usersReducer: PropTypes.object.isRequired,
    handleConversationSelect: PropTypes.func.isRequired,
    selectedConversation: PropTypes.string,
    checkBoxes: PropTypes.object,
    handleNewChatSelection: PropTypes.func.isRequired,
    isCheckBoxSelected: PropTypes.func.isRequired,
    handleChatNameInput: PropTypes.func.isRequired,
    handleNewChatSubmit: PropTypes.func.isRequired,
    newChatReducer: PropTypes.object.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MaterialDrawer);
