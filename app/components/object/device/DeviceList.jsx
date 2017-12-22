import React from 'react'
import { connect } from 'react-redux'
import { Label, Row } from 'react-bootstrap'

import Device from "./Device.jsx"

const DeviceList = ({deviceIds}) => (
    <ul className="object-list">
        {deviceIds.map((deviceId) => <Device key={deviceId} deviceId={deviceId} />)}
    </ul>
)

const mapStateToProps = (state) => ({
    deviceIds: state.devices.ids
})

export default connect(mapStateToProps)(DeviceList)
