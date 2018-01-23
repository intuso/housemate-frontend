import fetch from 'isomorphic-fetch'
import { connectWebSocketAction } from "redux-simple-websocket"

export const LOAD_REQUEST = 'LOAD_REQUEST';
function loadRequest() {
    return {
        type: LOAD_REQUEST
    }
}

export const LOAD_RESPONSE = 'LOAD_RESPONSE';
function loadResponse(tree) {
    return {
        type: LOAD_RESPONSE,
        tree: tree
    }
}

export const SERVER_ERROR = 'SERVER_ERROR';
function loadError() {
    return {
        type: SERVER_ERROR
    }
}

export const PERFORM_REQUEST = 'PERFORM_REQUEST';
function performRequest(path) {
    return {
        type: PERFORM_REQUEST,
        path: path
    }
}

export const PERFORM_RESPONSE = 'PERFORM_RESPONSE';
function performResponse(path, success, message) {
    return {
        type: PERFORM_RESPONSE,
        path: path,
        success: success,
        message: message
    }
}

export function listen() {
    return function (dispatch) {
        dispatch(connectWebSocketAction(
            (window.location.protocol === 'https' ? "wss" : "ws")
            + "://"
            + window.location.host
            + window.location.pathname
            + "/../../api/server/1.0/listen"));
    }
}

export function load(view) {
    return function (dispatch) {
        dispatch(loadRequest());
        return fetch(`../api/server/1.0/object/view`, {
                method: 'POST',
                credentials: 'include',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
                body: JSON.stringify(view)
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

export function perform(path, values) {
    return function (dispatch) {
        dispatch(performRequest(path));
        return fetch(`../api/server/1.0/object/perform?path=` + path, {
            method: 'POST',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(values)
        })
            .then(response => {
                if(response.ok) {
                    dispatch(performResponse(path, true, ''))
                } else {
                    dispatch(performResponse(path, false, response.message))
                }
            })
            .catch(e => dispatch(performResponse(path, false, e.message)))
    }
}