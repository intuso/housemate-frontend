import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import DeviceList from '../../../components/object/device/DeviceList.jsx'
import { load } from '../actions.jsx'

class Layout extends React.Component {

    componentDidMount() {
        this.props.actions.load();
    }

    render() {
        return (
            <DeviceList />
        )
    }
}

const mapStateToProps = (state) => ({
    frontend: state.frontend,
    devices: state.devices
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ load }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);