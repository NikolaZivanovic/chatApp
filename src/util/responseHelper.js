const DEFAULT_RESPONSE_ERROR = 'Error';

export const parseResponseError = error => {

    if (typeof error === 'string') {
        return error;
    }

    if (error && error.data && error.data.message) {
        return error.data.message;
    }

    if (error && error.data && error.data.codeMessage) {
        return error.data.codeMessage;
    }

    return DEFAULT_RESPONSE_ERROR;
};
