import deepPurple from '@material-ui/core/colors/deepPurple';

export const styles = {
    containerLeft: {
        borderRadius: '24px',
        marginBottom: '1em',
        width: 'max-content',
        minWidth: '100px',
        maxWidth: '370px',
        alignSelf: 'flex-start',
    },
    containerRight: {
        borderRadius: '24px',
        marginBottom: '1em',
        width: 'max-content',
        maxWidth: '370px',
        minWidth: '100px',
        alignSelf: 'flex-end',
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        fontSize: '0,9em',
        color: deepPurple[500],

    },
    date: {
        display: 'flex',
        justifyContent: 'flex-end',
        opacity: 0.5,
        fontSize: '0.8em',
    },
    container: {
        padding: '0.5em',
        paddingBottom: '0.2em !important',
    },
    message: {
        textAlign: 'left',
    }
};

