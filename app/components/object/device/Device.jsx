import React from 'react'
import { connect } from 'react-redux'
import { Col, Glyphicon } from 'react-bootstrap';
import Ability from '../ability/Ability.jsx'
import Name from '../Name.jsx'

const Device = ({device}) => (
    <li className="object device">
        <Name name={device.data.name} />
        <div className="body container">
            <div className="body content">
                {device.data.abilities.map((ability) => <Ability key={ability} id={ability} device={device}/>)}
            </div>
        </div>
    </li>
);

const mapStateToProps = (state, ownProps) => ({
    device: state.devices.byId[ownProps.id]
});

export default connect(mapStateToProps)(Device)
