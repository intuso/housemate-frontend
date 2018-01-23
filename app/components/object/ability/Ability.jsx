import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap';
import { perform } from '../../../tree/actions.jsx'

class Ability extends React.Component {

    turnOn = (e) => this.props.actions.perform(this.props.devicePath + ".commands.on", {});

    turnOff = (e) => this.props.actions.perform(this.props.devicePath + ".commands.off", {});

    render() {
        if(this.props.ability === 'power') {
            const on = this.props.device.children.values.children.on;
            if (this.props.device.data.classes.includes('light')) {
                if(on && on.data && on.data.values && on.data.values.elements && on.data.values.elements[0] && on.data.values.elements[0].value === 'true') {
                    return (<div className="ability">
                        <Button bsStyle='default' onClick={this.turnOff}><img src="../image/light-on.png"/></Button>
                    </div>)
                } else {
                    return (<div className="ability">
                        <Button bsStyle='default' onClick={this.turnOn}><img src="../image/light-off.png"/></Button>
                    </div>)
                }
            } else {
                if(on && on.data && on.data.values && on.data.values.elements && on.data.values.elements[0] && on.data.values.elements[0].value === 'true') {
                    return (<div className="ability">
                        <Button bsStyle='default' onClick={this.turnOff}><img src="../image/power-on.png"/></Button>
                    </div>)
                } else {
                    return (<div className="ability">
                        <Button bsStyle='default' onClick={this.turnOn}><img src="../image/power-off.png"/></Button>
                    </div>)
                }
            }
        } else
            return null;
    }
}

const mapStateToProps = (state, ownProps) => ({
    devicePath: ownProps.devicePath,
    device: ownProps.device,
    ability: ownProps.ability
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ perform }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Ability)
