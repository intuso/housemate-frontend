import React from 'react'
import { connect } from 'react-redux'
import { Label, Row } from 'react-bootstrap'

import Device from "./Device.jsx"

const DeviceList = ({tree}) => (
    <ul className="object-list">
        {tree.children && tree.children.devices && tree.children.devices.children && Object.keys(tree.children.devices.children).map((deviceId) => <Device key={deviceId} devicePath={tree.children.devices.children[deviceId].data.path} device={get(tree, tree.children.devices.children[deviceId].data.path)} />)}
    </ul>
);

function get(object, path) {

    if(path === null || path.length === 0)
        return object;

    var current = object;
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

const mapStateToProps = (state) => ({
    tree: state.tree
});

export default connect(mapStateToProps)(DeviceList)
