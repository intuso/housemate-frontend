import React from 'react'
import { connect } from 'react-redux'
import { Col, Glyphicon } from 'react-bootstrap';
import Component from '../component/Component.jsx'
import Name from '../Name.jsx'

const Device = ({devicePath, device}) => (
    <li className="object device">
        <Name name={device.data.name} />
        <div className="body container">
            <div className="body content">
                {device.children && device.children.components && device.children.components.children && Object.keys(device.children.components.children).map((componentId) => <Component key={componentId} devicePath={devicePath} device={device} componentPath={devicePath + '.components.' + componentId} component={device.children.components.children[componentId]} />)}
            </div>
        </div>
    </li>
);

const mapStateToProps = (state, ownProps) => ({
    devicePath: ownProps.devicePath,
    device: ownProps.device
});

export default connect(mapStateToProps)(Device)
