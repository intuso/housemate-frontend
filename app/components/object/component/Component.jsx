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

    power = (abilities, classes, on) => {
        if (abilities.includes('power-control') && abilities.includes('power-state')) {
            return <img onClick={on ? this.turnOff : this.turnOn}
                        className={"button power " + (on ? "on " : "off ") + classes}/>;
        } else if(abilities.includes('power-control')) {
            return <img onClick={on ? this.turnOff : this.turnOn}
                        className={"button power " + classes}/>;
        } else if(abilities.includes('power-state')) {
            return <img className={"button power " + (on ? "on " : "off ") + classes}/>;
        } else
            return <div/>;
    };

    variablePower = (abilities, classes, percent) => {
        if (abilities.includes('power-variable-control') && abilities.includes('power-variable-state')) {
            return <div>
                <img onClick={this.decrease}
                     className={"inline space-after-small button button-small power decrease " + classes}/>
                <input className="inline space-after-small slider" type="range" id="brightness-slider" min="0" max="100"
                       step="1" onChange={this.set} value={percent}/>
                <img onClick={this.increase} className={"inline button button-small power increase " + classes}/>
            </div>;
        } else if(abilities.includes('power-variable-control')) {
            return <div>
                <img onClick={this.decrease}
                     className={"inline space-after-small button button-small power decrease " + classes}/>
                <input className="inline space-after-small slider" type="range" id="brightness-slider" min="0" max="100"
                       step="1" onChange={this.set}/>
                <img onClick={this.increase} className={"inline button button-small power increase " + classes}/>
            </div>;
        } else if(abilities.includes('power-variable-state')) {
            return <input className="inline space-after-small slider" type="range" id="brightness-slider" min="0" max="100"
                          step="1" value={percent}/>;
        } else
            return <div/>;
    };

    powerComponent = (abilities) => {

        // get the value objects and their values
        const onValue = this.props.component.children.values.children.on;
        const on = onValue && onValue.data && onValue.data.values && onValue.data.values[0] && onValue.data.values[0].value && onValue.data.values[0].value.toLowerCase() === 'true';
        // get the value objects and their values
        const percentValue = this.props.component.children.values.children.percent;
        const percent = percentValue && percentValue.data && percentValue.data.values && percentValue.data.values && percentValue.data.values[0] && percentValue.data.values[0].value;

        // build up the css classes
        const classes = this.props.component.data.classes.join(' ');

        const hasPower = abilities.includes('power-control') || abilities.includes('power-state');
        const hasVariablePower = abilities.includes('power-variable-control') || abilities.includes('power-variable-state');

        // return the react component, with a slider if it's variable power
        if (hasPower && hasVariablePower) {
            return (<div>
                <div className="inline space-after">
                    {this.power(abilities, classes, on)}
                </div>
                <div className="inline">
                    {this.variablePower(abilities, classes, percent)}
                </div>
            </div>);
        } else if (hasPower) {
            return this.power(abilities, classes, on)
        } else if (hasVariablePower) {
            return this.variablePower(abilities, classes, percent)
        } else
            return <div/>;
    };

    temperatureComponent = (abilities) => {

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
        if (abilities.includes('power-control') || abilities.includes('power-state') || abilities.includes('power-variable-control') || abilities.includes('power-variable-state'))
            return this.powerComponent(abilities);
        else if (abilities.includes('temperature-control') || abilities.includes('temperature-state'))
            return this.temperatureComponent(abilities);
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
