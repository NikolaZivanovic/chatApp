import React from 'react';
import PropTypes from 'prop-types';

import {styles} from './MaterialLoader.styles';

import {withStyles} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const MaterialLoader = ({classes}) => {

    return (
        <CircularProgress className={classes.progress}/>
    );

};

MaterialLoader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialLoader);
