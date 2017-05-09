import fetch from 'isomorphic-fetch'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
function loginRequest(credentials) {
    return {
        type: LOGIN_REQUEST,
        credentials: credentials
    }
}

export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
function loginResponse(response) {
    return {
        type: LOGIN_RESPONSE,
        response: response
    }
}

export const SERVER_ERROR = 'SERVER_ERROR';
function serverError() {
    return {
        type: SERVER_ERROR
    }
}

export function login(email, password) {
    return function (dispatch) {
        dispatch(loginRequest({ email: email, password: password }));
        var postParams = new URLSearchParams();
        postParams.append('email', email);
        postParams.append('password', password);
        return fetch(`../api/server/1.0/login`, {
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
                    response.json().then(json => dispatch(loginResponse(json)))
                } else {
                    dispatch(serverError())
                }
            })
            .catch(e => dispatch(serverError()))
    }
}