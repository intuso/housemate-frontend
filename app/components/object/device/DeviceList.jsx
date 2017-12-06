import React from 'react'
import { connect } from 'react-redux'
import { Label, Row } from 'react-bootstrap'

import Device from "./Device.jsx"

const DeviceList = ({ids}) => (
    <ul className="object-list">
        {ids.map((id) => <Device key={id} id={id} />)}
    </ul>
)

const mapStateToProps = (state) => ({
    ids: state.devices.ids
})

export default connect(mapStateToProps)(DeviceList)
