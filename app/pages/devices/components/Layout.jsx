import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Grid } from 'react-bootstrap'

import Header from '../../../components/header/Header.jsx'
import DeviceList from '../../../components/object/device/DeviceList.jsx'
import { listen, load } from '../../../tree/actions.jsx'

class Layout extends React.Component {

    componentDidMount() {
        this.props.actions.listen();
        this.props.actions.load({
            _type : "server",
            mode : "SELECTION",
            devices : {
                _type : "list",
                mode : "CHILDREN",
                view : {
                    _type : "device",
                    mode : "SELECTION",
                    components : {
                        _type : "list",
                        mode : "ANCESTORS",
                        watchAncestors : true
                    }
                }
            }
        });
    }

    render() {
        return (
            <Grid fluid={true}>
                <Header />
                <DeviceList />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    frontend: state.frontend,
    tree: state.tree
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ listen, load }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);