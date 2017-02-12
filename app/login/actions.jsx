import fetch from 'isomorphic-fetch'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function loginRequest(email, password) {
    return {
        type: LOGIN_REQUEST,
        credentials: {
            email: email,
            password: password
        }
    }
}

export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export function loginResponse(user, errors) {
    return {
        type: LOGIN_RESPONSE,
        user: user,
        errors: errors
    }
}

export const LOGIN_ERROR = 'LOGIN_ERROR';
export function loginError() {
    return {
        type: LOGIN_ERROR
    }
}

export function login(email, password) {
    return function (dispatch) {
        dispatch(loginRequest(email, password));
        var postParams = new URLSearchParams();
        postParams.append('email', email);
        postParams.append('password', password);
        return fetch(`../api/globalserver/1.0/session/login`, {
                method: 'POST',
                credentials: 'include',
                headers : new Headers({
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }),
                body: postParams
            })
            .then(response => response.json())
            .then(json => dispatch(loginResponse(json.user, {
                form: json.error,
                email: '',
                password: ''
            })))
            .catch(e => dispatch(loginError()))
    }
}