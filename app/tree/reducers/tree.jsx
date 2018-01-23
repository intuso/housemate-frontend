import { LOAD_RESPONSE } from '../actions.jsx';
import { ActionTypes } from "redux-simple-websocket"

export const defaultState = {};

export default (state = defaultState, action = {}) => {
    let result = deepCopy(state);
    switch(action.type) {
        case ActionTypes.RECEIVED_WEBSOCKET_DATA:
            if(path !== undefined && path !== null)
                merge(get(result, action.payload.path), action.payload.tree);
            break;
        case LOAD_RESPONSE:
            merge(result, action.tree);
            break;
    }
    return Object.assign({}, state, result);
}

function deepCopy(object) {
    let result = {};
    for (let key in object) {
        if(Array.isArray(object[key]))
            result[key] = object[key].slice(0);
        else if(typeof object[key] === 'object')
            result[key] = deepCopy(object[key]);
        else
            result[key] = object[key];
    }
    return result;
}

function get(object, path) {

    if(path === null || path.length === 0)
        return object;

    let current = object;
    let pathElements = path.split(".");
    for(let index in pathElements) {
        if(current.children === undefined)
            current.children = {};
        if(current.children[pathElements[index]] === undefined)
            current.children[pathElements[index]] = {};
       current = current.children[pathElements[index]];
    }

    return current;
}

function merge(originalTree, newTree) {
    if(newTree.data !== undefined)
        originalTree.data = newTree.data;
    if(newTree.children !== undefined) {
        if (originalTree.children === undefined)
            originalTree.children = {};
        for (let key in newTree.children) {
            if (originalTree.children[key] === undefined)
                originalTree.children[key] = newTree.children[key];
            else
                merge(originalTree.children[key], newTree.children[key]);
        }
    }
}