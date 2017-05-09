import fetch from 'isomorphic-fetch'

export const LOAD_REQUEST = 'LOAD_REQUEST';
function loadRequest() {
    return {
        type: LOAD_REQUEST
    }
}

export const LOAD_RESPONSE = 'LOAD_RESPONSE';
function loadResponse(user) {
    return {
        type: LOAD_RESPONSE,
        user: user
    }
}

export const LOAD_ERROR = 'LOAD_ERROR';
function loadError() {
    return {
        type: LOAD_ERROR
    }
}

export const SAVE_REQUEST = 'SAVE_REQUEST';
function saveRequest() {
    return {
        type: SAVE_REQUEST
    }
}

export const SAVE_RESPONSE = 'SAVE_RESPONSE';
function saveResponse(response) {
    return {
        type: SAVE_RESPONSE,
        response: response
    }
}

export const SAVE_ERROR = 'SAVE_ERROR';
function saveError() {
    return {
        type: SAVE_ERROR
    }
}

export function load() {
    return function (dispatch) {
        dispatch(loadRequest());
        return fetch(`../api/server/1.0/currentuser`, {
            credentials: 'include',
            headers : new Headers({
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            })
        })
            .then(response => {
                if(response.ok) {
                    response.json().then(json => dispatch(loadResponse(json)))
                } else {
                    dispatch(loadError())
                }
            })
            .catch(e => dispatch(loadError()))
    }
}

export function save(user) {
    return function (dispatch) {
        dispatch(saveRequest());
        return fetch(`../api/server/1.0/currentuser`, {
            method: 'POST',
            credentials: 'include',
            headers : new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(user)
        })
            .then(response => {
                if(response.ok) {
                    response.json().then(json => dispatch(saveResponse(json)))
                } else {
                    dispatch(saveError())
                }
            })
            .catch(e => dispatch(saveError()))
    }
}