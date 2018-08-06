import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap';
import { perform } from '../../../tree/actions.jsx'

class Ability extends React.Component {

    turnOn = (event) => this.props.actions.perform(this.props.devicePath + ".commands.on", {});

    turnOff = (event) => this.props.actions.perform(this.props.devicePath + ".commands.off", {});

    set = (event) => this.props.actions.perform(this.props.devicePath + ".commands.set", {"percent" : [{"value" : event.target.value}]});

    increase = (event) => this.props.actions.perform(this.props.devicePath + ".commands.increase", {});

    decrease = (event) => this.props.actions.perform(this.props.devicePath + ".commands.decrease", {});

    power = () => {

        // get the value objects and their values
        const onValue = this.props.device.children.values.children.on;
        const isOn = onValue && onValue.data && onValue.data.values && onValue.data.values[0] && onValue.data.values[0].value && onValue.data.values[0].value.toLowerCase() === 'true';

        // get the commands
        const onCommand = isOn ? this.turnOff : this.turnOn;

        // build up the css classes
        const allClasses = this.props.device.data.classes.slice();
        allClasses.push('power');
        const onClasses = allClasses.slice();
        onClasses.push(isOn ? 'on' : 'off');

        // make the react component
        const button = (<div className="ability-row">
            <Button bsStyle='default' onClick={onCommand}><img className={onClasses.join(' ')}/></Button>
        </div>);

        // if it's variable, create the slider
        let slider = null;
        if(this.props.ability === 'power.variable') {

            // get the value objects and their values
            const percentValue = this.props.device.children.values.children.percent;
            const percent = percentValue && percentValue.data && percentValue.data.values && percentValue.data.values && percentValue.data.values[0] && percentValue.data.values[0].value;

            // build up the css classes
            const decreaseClasses = allClasses.slice();
            decreaseClasses.push('decrease');
            const increaseClasses = allClasses.slice();
            increaseClasses.push('increase');

            // make the react component
            slider = (<div className="ability-row">
                <Button bsStyle='default' bsSize='xsmall' onClick={this.decrease}><img className={decreaseClasses.join(' ')}/></Button>
                <input type="range" id="brightness-slider" min="0" max="100" step="1" onChange={this.set} value={percent}/>
                <Button bsStyle='default' bsSize='xsmall' onClick={this.increase}><img className={increaseClasses.join(' ')}/></Button>
            </div>);
        }
        return (<div className="ability">
            {button}
            {slider}
        </div>);
    };

    temperature = () => {

        // get the value objects and their values
        const temperatureValue = this.props.device.children.values.children.temperature;
        const temperature = temperatureValue && temperatureValue.data && temperatureValue.data.values && temperatureValue.data.values && temperatureValue.data.values[0] && temperatureValue.data.values[0].value ;

        // build up the css classes
        const allClasses = this.props.device.data.classes.slice();
        allClasses.push('temperature');

        // make the react component
        const img = (<div className="ability-row">
            <img className={allClasses.join(' ')}/>{temperature} C
        </div>);

        return (<div className="ability">
            {img}
        </div>);
    }

    render() {
        if (this.props.ability === 'power' || this.props.ability === 'power.variable')
            return this.power();
        if (this.props.ability === 'temperaturesensor' || this.props.ability === 'temperaturesensor.thermostat')
            return this.temperature();
        else
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
