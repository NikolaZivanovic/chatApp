import axios from 'axios';
//import CachedFetch from './CachedFetch';
import CONFIG from '../config/config';
import { push } from 'react-router-redux';
import { LOGOUT_SUCCESS } from '../components/Common/Logout/Logout.actionTypes';
import APP_ROUTES from '../config/appRoutes';


class Ajax {
    constructor( ajaxLib = axios ) {
        this.ajaxLib = ajaxLib;
    }

    initialize( dispatch ) {
        this.ajaxLib.defaults.timeout = CONFIG.AJAX_REQUEST_DEFAULT_TIMEOUT;
        this.ajaxLib.defaults.responseType = 'json';
        this.setBaseUrl( CONFIG.API_BUNQ_BASE_URL );
        this.setInterceptors( dispatch );
    }

    setBaseUrl( url ) {
        this.ajaxLib.defaults.baseURL = url;
    }

    setInterceptors( dispatch ) {
        this.ajaxLib.interceptors.response.use(
            response => response,
            error => {
                if ( error && error.response && error.response.status && error.response.status === 401 ) {
                    dispatch( { type: LOGOUT_SUCCESS } );
                    dispatch( push( APP_ROUTES.LOGIN ) );
                }

                return Promise.reject( error );
            } );
    }


    get() {
        return this.ajaxLib.get.apply( null, arguments );
    }

    post() {
        return this.ajaxLib.post.apply( null, arguments );
    }

    put() {
        return this.ajaxLib.put.apply( null, arguments );
    }

    patch() {
        return this.ajaxLib.patch.apply( null, arguments );
    }

    delete() {
        return this.ajaxLib.delete.apply( null, arguments );
    }

    // cachedFetch() {
    //     // TODO: set new instance of cached fetch for each new instance of Ajax!
    //     // quick fix - until CachedFetch is fixed
    //
    //     // return CachedFetch.get.apply( CachedFetch, arguments );
    //     return this.ajaxLib.get.apply( null, [ arguments[ 0 ][ 'url' ], { params: arguments[ 0 ][ 'params' ] } ] );
    // }
}

const ajaxInstance = new Ajax();

export const getNewInstance = ( { baseUrl } ) => {
    const newAxiosInstance = axios.create( {
        timeout: CONFIG.AJAX_REQUEST_DEFAULT_TIMEOUT,
        responseType: 'json',
    } );
    const newAjaxInstance = new Ajax( newAxiosInstance );
    newAjaxInstance.setBaseUrl( baseUrl );
    return newAjaxInstance;
};

export default ajaxInstance;

// create ajax instances for all different APIs
export const ajaxBunq = getNewInstance( { baseUrl: CONFIG.API_BUNQ_BASE_URL } );

