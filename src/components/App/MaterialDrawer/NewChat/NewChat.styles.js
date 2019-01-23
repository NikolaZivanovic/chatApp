import deepPurple from '@material-ui/core/colors/deepPurple';


export const styles = theme =>({
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    listItem: {
        padding: '2em',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: deepPurple[300]
        },
    },
    listItemBlocked: {
        padding: '2em',
        '&:hover': {
            cursor: 'not-allowed',
            backgroundColor: deepPurple[400]
        },
    },
    textField: {
        width: '100%',
        margin: theme.spacing.unit,
    },
});
