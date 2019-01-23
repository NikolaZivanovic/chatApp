import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {styles} from './MessageChipWidget.styles';

import {withStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const MessageChipWidget = props => {


    const {classes, message, user, matchUserIdToName} = props;
    const time = moment.utc(message.timestamp).local().format();
    return (
        <div className={message.senderId === user.id && classes.containerRight || classes.containerLeft}>
            <Card>
                <CardContent className={classes.container}>
                    <Typography className={classes.header}>
                        {
                            message.senderId !== user.id &&
                            matchUserIdToName(message.senderId)
                        }

                    </Typography>
                    <Typography className={classes.messages} component="p">
                        {message.message}
                    </Typography>
                    <Typography className={classes.date}>
                        {
                            moment(time).fromNow()
                        }
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )

};

MessageChipWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    matchUserIdToName: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageChipWidget);
