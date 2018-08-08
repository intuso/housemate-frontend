import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap';
import { perform } from '../../../tree/actions.jsx'

class Component extends React.Component {

    turnOn = (event) => this.props.actions.perform(this.props.componentPath + ".commands.on", {});

    turnOff = (event) => this.props.actions.perform(this.props.componentPath + ".commands.off", {});

    set = (event) => this.props.actions.perform(this.props.componentPath + ".commands.set", {"percent" : [{"value" : event.target.value}]});

    increase = (event) => this.props.actions.perform(this.props.componentPath + ".commands.increase", {});

    decrease = (event) => this.props.actions.perform(this.props.componentPath + ".commands.decrease", {});

    power = (abilities) => {

        // get the value objects and their values
        const onValue = this.props.component.children.values.children.on;
        const isOn = onValue && onValue.data && onValue.data.values && onValue.data.values[0] && onValue.data.values[0].value && onValue.data.values[0].value.toLowerCase() === 'true';
        // get the value objects and their values
        const percentValue = this.props.component.children.values.children.percent;
        const percent = percentValue && percentValue.data && percentValue.data.values && percentValue.data.values && percentValue.data.values[0] && percentValue.data.values[0].value;

        // build up the css classes
        const classes = this.props.component.data.classes.join(' ');
        const onClass = isOn ? 'on ' : 'off ';

        // return the react component, with a slider if it's variable power
        if(abilities.includes('power.variable')) {
            return (<div className="hm-lr">
                <img onClick={isOn ? this.turnOff : this.turnOn} className={"inline space-after button power " + onClass + classes}/>
                <img onClick={this.decrease} className={"inline space-after button button-small power decrease " + classes}/>
                <input className="inline space-after slider" type="range" id="brightness-slider" min="0" max="100" step="1"
                       onChange={this.set} value={percent}/>
                <img  onClick={this.increase} className={"inline button button-small power increase " + classes}/>
            </div>);
        } else {
            return <img onClick={isOn ? this.turnOff : this.turnOn} className={"button power " + onClass + classes}/>;
        }
    };

    temperature = (abilities) => {

        // get the value objects and their values
        const temperatureValue = this.props.component.children.values.children.temperature;
        const temperature = temperatureValue && temperatureValue.data && temperatureValue.data.values && temperatureValue.data.values && temperatureValue.data.values[0] && temperatureValue.data.values[0].value ;

        // build up the css classes
        const allClasses = this.props.component.data.classes.slice();
        allClasses.push('temperature');

        // return the react component
        return (<span>{temperature}&deg;c</span>);
    };

    render() {
        const abilities = this.props.component.data && this.props.component.data.abilities;
        if (abilities.includes('power') || abilities.includes('power.variable'))
            return this.power(abilities);
        else if (abilities.includes('temperaturesensor') || abilities.includes('temperaturesensor.thermostat'))
            return this.temperature(abilities);
        else
            return null;
    }
}

const mapStateToProps = (state, ownProps) => ({
    devicePath: ownProps.devicePath,
    device: ownProps.device,
    componentPath: ownProps.componentPath,
    component: ownProps.component
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ perform }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Component)
