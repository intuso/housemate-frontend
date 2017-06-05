import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap';
import Header from '../Header.jsx'

const Device = ({device}) => (
    <Col xs={4}>
        <div className="object device">
            <Header name={device.name} />
            <div className="body">

            </div>
        </div>
    </Col>
);

const mapStateToProps = (state, ownProps) => ({
    device: state.devices.byId[ownProps.id]
});

export default connect(mapStateToProps)(Device)
