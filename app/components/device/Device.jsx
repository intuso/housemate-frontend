import React from 'react'
import { connect } from 'react-redux'

const Device = ({device}) => (
    <div className="col-md-4">
        {device.name}
    </div>
);

const mapStateToProps = (state, ownProps) => ({
    device: state.devices[ownProps.id],
});

export default connect(mapStateToProps)(Device)
