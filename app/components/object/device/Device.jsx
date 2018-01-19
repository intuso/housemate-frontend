import React from 'react'
import { connect } from 'react-redux'
import { Col, Glyphicon } from 'react-bootstrap';
import Ability from '../ability/Ability.jsx'
import Name from '../Name.jsx'

const Device = ({devicePath, device}) => (
    <li className="object device">
        <Name name={device.data.name} />
        <div className="body container">
            <div className="body content">
                {device.data && device.data.abilities && device.data.abilities.map((ability) => <Ability key={ability} devicePath={devicePath} device={device} ability={ability} />)}
            </div>
        </div>
    </li>
);

const mapStateToProps = (state, ownProps) => ({
    devicePath: ownProps.devicePath,
    device: ownProps.device
});

export default connect(mapStateToProps)(Device)
