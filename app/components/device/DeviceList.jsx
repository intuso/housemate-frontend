import React       from 'react'
import connect from 'react-redux'

const DeviceList = ({devices, ids, actions}) => (
    <div className='row'>
        {ids.map((id, index) => <Device key={id} id={id} index={index} />)}
    </div>
);

const mapStateToProps = (state) => ({
    ids: state.devices.ids
});

export default connect(mapStateToProps)(DeviceList)
