import fetch from 'isomorphic-fetch'

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
function registerRequest(credentials) {
    return {
        type: REGISTER_REQUEST,
        credentials: credentials
    }
}

export const REGISTER_RESPONSE = 'REGISTER_RESPONSE';
function registerResponse(response) {
    return {
        type: REGISTER_RESPONSE,
        response: response
    }
}

export const SERVER_ERROR = 'SERVER_ERROR';
function serverError() {
    return {
        type: SERVER_ERROR
    }
}

export function register(email, password) {
    return function (dispatch) {
        dispatch(registerRequest({ email: email, password: password }));
        const postParams = new URLSearchParams();
        postParams.append('email', email);
        postParams.append('password', password);
        return fetch(`../api/server/1.0/register`, {
                method: 'POST',
                credentials: 'include',
                headers : new Headers({
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }),
                body: postParams
            })
            .then(response => {
                if(response.ok) {
                    response.json().then(json => dispatch(registerResponse(json)))
                } else {
                    dispatch(serverError())
                }
            })
            .catch(e => dispatch(serverError()))
    }
}