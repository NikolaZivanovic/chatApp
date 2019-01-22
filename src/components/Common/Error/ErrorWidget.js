import React from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorWidget.scss';


const ErrorWidget = ({ errorMessage, isWithoutArrow }) => {
    return (
        <div className={styles.Container}>
            {
                !isWithoutArrow &&
                <span className={styles.TopArrow}/>
            }
            <span>{errorMessage}</span>
        </div>
    )
};

ErrorWidget.propTypes = {
    errorMessage: PropTypes.string,
    isWithoutArrow: PropTypes.bool,
};

ErrorWidget.defaultProps = {
    isWithoutArrow: false,
};

export default ErrorWidget;
