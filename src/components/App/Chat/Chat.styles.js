export const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100vh',
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '95vh',
        overflowY: 'scroll',
        padding: '5em 1em 1em 1em',
    },
    loadMore: {
        '&:hover': {
            cursor: 'pointer',
        }
    }
};
