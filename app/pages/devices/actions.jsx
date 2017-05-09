import fetch from 'isomorphic-fetch'

export const LOAD_REQUEST = 'LOAD_REQUEST';
function loginRequest(credentials) {
    return {
        type: LOAD_REQUEST,
        credentials: credentials
    }
}

export const LOAD_RESPONSE = 'LOAD_RESPONSE';
function loginResponse(response) {
    return {
        type: LOAD_RESPONSE,
        response: response
    }
}

export const SERVER_ERROR = 'SERVER_ERROR';
function serverError() {
    return {
        type: SERVER_ERROR
    }
}

export function load() {
    return function (dispatch) {
        dispatch(loadRequest());
        var postParams = new URLSearchParams();
        return fetch(`../api/server/1.0/devices`, {
                method: 'GET',
                credentials: 'include',
                headers : new Headers({
                    'Accept': 'application/json'
                }),
                body: postParams
            })
            .then(response => {
                if(response.ok) {
                    response.json().then(json => dispatch(loginResponse(json)))
                } else {
                    dispatch(serverError())
                }
            })
            .catch(e => dispatch(serverError()))
    }
}