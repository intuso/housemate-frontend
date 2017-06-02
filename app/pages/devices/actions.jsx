import fetch from 'isomorphic-fetch'

export const LOAD_REQUEST = 'LOAD_REQUEST';
function loadRequest() {
    return {
        type: LOAD_REQUEST
    }
}

export const LOAD_RESPONSE = 'LOAD_RESPONSE';
function loadResponse(response) {
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
        return fetch(`../api/server/1.0/util/ability/power`, {
                method: 'GET',
                credentials: 'include',
                headers : new Headers({
                    'Accept': 'application/json'
                })
            })
            .then(response => {
                if(response.ok) {
                    response.json().then(json => dispatch(loadResponse(json)))
                } else {
                    dispatch(serverError())
                }
            })
            .catch(e => dispatch(serverError()))
    }
}