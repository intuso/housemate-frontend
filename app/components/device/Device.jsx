import React from 'react'
import { connect } from 'react-redux'
import { Col, Label } from 'react-bootstrap';

const Device = ({device}) => (
    <Col xs={4}>
        <Label>{device.name}</Label>
    </Col>
);

const mapStateToProps = (state, ownProps) => ({
    device: state.devices.byId[ownProps.id]
});

export default connect(mapStateToProps)(Device)
