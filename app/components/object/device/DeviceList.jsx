import React from 'react'
import { connect } from 'react-redux'
import { Label, Row } from 'react-bootstrap'

import Device from "./Device.jsx"

const DeviceList = ({ids}) => (
    <Row>
        {ids.map((id) => <Device key={id} id={id} />)}
    </Row>
)

const mapStateToProps = (state) => ({
    ids: state.devices.ids
})

export default connect(mapStateToProps)(DeviceList)
