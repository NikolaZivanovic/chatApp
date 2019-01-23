import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

export const styles = {
    avatar: {
        margin: 10,
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    listItem: {
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#F0F0F0'
        },
    },
    listItemActive: {
        backgroundColor: '#E0E0E0'
    }
};
