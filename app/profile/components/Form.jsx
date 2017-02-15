import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Alert, Button, Col, ControlLabel, FormControl, FormGroup, HelpBlock, Row } from 'react-bootstrap';

import { save } from '../actions.jsx';

class Form extends React.Component {

    state = {
        email: this.props.response.user.email,
        serverAddress: this.props.response.user.serverAddress
    };

    handleSave = (e) => {
        e.preventDefault();
        this.props.actions.save({
            email: this.state.email,
            serverAddress: this.state.serverAddress
        });
    };

    handleEmailChange = (e) => this.setState({ email: e.target.value });

    handleServerAddressChange = (e) => this.setState({ serverAddress: e.target.value });

    render() {

        const { email, serverAddress } = this.state;
        const { saveError, validEmail, alreadyRegistered, validServerAddress, user } = this.props.response;
        const { saving } = this.props.frontend;

        // if nothing submitted, show no errors
        // otherwise, show server error if there is one
        // otherwise show email error if there is one and the email hasn't changed from what was submitted
        // otherwise show server address error if there is one and the server address hasn't changed from what was submitted

        const showErrors = !saving;
        const serverError = showErrors && saveError;
        const emailError = showErrors && !serverError && user.email === email && (!validEmail || alreadyRegistered);
        const serverAddressError = showErrors && !emailError && user.serverAddress === serverAddress && !validServerAddress;
        const saveEnabled = !saving;

        const errorMessage = serverError ? saveError
            : emailError ? (!validEmail ? 'Invalid email address' : 'Email address already belongs to another user.')
            : serverAddressError ? 'Invalid server address'
            : '';

        return (
            <Row>
                <Col xs={4} xsOffset={4}>
                    <form onSubmit={this.handleSave}>

                        <h1>Your Profile</h1>

                        <FormGroup controlId='email' validationState={emailError ? 'error' : null }>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type='email'
                                value={email}
                                placeholder='someone@example.com'
                                onChange={this.handleEmailChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>

                        <FormGroup controlId='serverAddress' validationState={serverAddressError ? 'error' : null }>
                            <ControlLabel>Server Address</ControlLabel>
                            <FormControl
                                type='text'
                                value={serverAddress}
                                onChange={this.handleServerAddressChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>

                        { errorMessage && <Alert bsStyle='danger'>{ errorMessage }</Alert> }

                        <Button type='submit' bsStyle='primary' bsSize='large' disabled={!saveEnabled}>Save</Button>
                    </form>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        frontend: state.frontend,
        response: state.response
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ save }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);