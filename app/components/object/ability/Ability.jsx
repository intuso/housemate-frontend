import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap';
import { perform } from '../../../tree/actions.jsx'

class Ability extends React.Component {

    turnOn = (e) => this.props.actions.perform(this.props.devicePath + ".commands.on", {});

    turnOff = (e) => this.props.actions.perform(this.props.devicePath + ".commands.off", {});

    increase = (e) => this.props.actions.perform(this.props.devicePath + ".commands.increase", {});

    decrease = (e) => this.props.actions.perform(this.props.devicePath + ".commands.decrease", {});

    render() {
        if(this.props.ability === 'power') {
            const onValue = this.props.device.children.values.children.on;
            const isOn = onValue && onValue.data && onValue.data.values && onValue.data.values.elements && onValue.data.values.elements[0] && onValue.data.values.elements[0].value && onValue.data.values.elements[0].value.toLowerCase() === 'true';
            if (this.props.device.data.classes.includes('light')) {
                if(isOn) {
                    return (<div className="ability">
                        <Button bsStyle='default' onClick={this.turnOff}><img src="../image/light-on.png"/></Button>
                    </div>)
                } else {
                    return (<div className="ability">
                        <Button bsStyle='default' onClick={this.turnOn}><img src="../image/light-off.png"/></Button>
                    </div>)
                }
            } else {
                if(isOn) {
                    return (<div className="ability">
                        <Button bsStyle='default' onClick={this.turnOff}><img src="../image/power-on.png"/></Button>
                    </div>)
                } else {
                    return (<div className="ability">
                        <Button bsStyle='default' onClick={this.turnOn}><img src="../image/power-off.png"/></Button>
                    </div>)
                }
            }
        } else if(this.props.ability === 'power.variable') {
            const onValue = this.props.device.children.values.children.on;
            const isOn = onValue && onValue.data && onValue.data.values && onValue.data.values.elements && onValue.data.values.elements[0] && onValue.data.values.elements[0].value && onValue.data.values.elements[0].value.toLowerCase() === 'true';
            const percentValue = this.props.device.children.values.children.percent;
            const amount = percentValue && percentValue.data && percentValue.data.values && percentValue.data.values.elements && percentValue.data.values.elements[0] && percentValue.data.values.elements[0].value;
            if (this.props.device.data.classes.includes('light')) {
                if(isOn) {
                    return (<div className="ability">
                        <div className="ability-row">
                            <Button bsStyle='default' onClick={this.turnOff}><img src="../image/light-on.png"/></Button>
                        </div>
                        <div className="ability-row">
                            <input type="range" id="brightness-slider" min="0" max="100" step="1" value={amount} />
                        </div>
                    </div>)
                } else {
                    return (<div className="ability">
                        <div className="ability-row">
                            <Button bsStyle='default' onClick={this.turnOff}><img src="../image/light-off.png"/></Button>
                        </div>
                        <div className="ability-row">
                            <input type="range" id="brightness-slider" min="0" max="100" step="1" value={amount} />
                        </div>
                    </div>)
                }
            } else {
                if(isOn) {
                    return (<div className="ability">
                        <div className="ability-row">
                            <Button bsStyle='default' onClick={this.turnOff}><img src="../image/power-on.png"/></Button>
                        </div>
                        <div className="ability-row">
                            <Button bsStyle='default' onClick={this.decrease}>-</Button>
                            <span>{amount}%</span>
                            <Button bsStyle='default' onClick={this.increase}>+</Button>
                        </div>
                    </div>)
                } else {
                    return (<div className="ability">
                        <div className="ability-row">
                            <Button bsStyle='default' onClick={this.turnOff}><img src="../image/power-off.png"/></Button>
                        </div>
                        <div className="ability-row">
                            <Button bsStyle='default' onClick={this.decrease}>-</Button>
                            <span>{amount}%</span>
                            <Button bsStyle='default' onClick={this.increase}>+</Button>
                        </div>
                    </div>)
                }
            }
        } else return null;
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
