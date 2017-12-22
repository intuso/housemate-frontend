import React from 'react'
import { connect } from 'react-redux'
import { Col, Glyphicon } from 'react-bootstrap';

class Ability extends React.Component {

    render() {
        if(this.props.ability === 'power') {
            var on = this.props.device.children.values.children.on;
            if (this.props.device.data.classes.includes('light')) {
                if(on) {
                    return (<div className="ability">
                        <img src="../image/light-on.png"/>
                    </div>)
                } else {
                    return (<div className="ability">
                        <img src="../image/light-off.png"/>
                    </div>)
                }
            } else {
                if(on) {
                    return (<div className="ability">
                        <img src="../image/power-on.png"/>
                    </div>)
                } else {
                    return (<div className="ability">
                        <img src="../image/power-off.png"/>
                    </div>)
                }
            }
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    device: state.devices.byId[ownProps.deviceId],
    ability: ownProps.ability
});

export default connect(mapStateToProps)(Ability)
