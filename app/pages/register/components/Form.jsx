import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Alert, Button, Col, ControlLabel, FormControl, FormGroup, HelpBlock, Row } from 'react-bootstrap';

import { register } from '../actions.jsx';

class Form extends React.Component {

    state = {
        email: '',
        password: '',
        passwordConfirm: '',
    };

    handleRegister = (e) => {
        e.preventDefault();
        this.props.actions.register(this.state.email, this.state.password);
    };

    handleEmailChange = (e) => this.setState({ email: e.target.value });

    handlePasswordChange = (e) => this.setState({ password: e.target.value });

    handlePasswordConfirmChange = (e) => this.setState({ passwordConfirm: e.target.value });

    render() {

        const { email, password, passwordConfirm } = this.state;
        const submittedCredentials = this.props.credentials;
        const { error, validEmail, alreadyRegistered, validPassword, success } = this.props.response;
        const { hasSubmitted, inProgress, next } = this.props.frontend;

        // todo, move this to the layout page and don't show the form!
        if(success) {
            window.location = next;
        }

        // if nothing submitted, show no errors
        // otherwise, show server error if there is one
        // otherwise show email error if there is one and the email hasn't changed from what was submitted
        // otherwise show password error if there is one and the password hasn't changed from what was submitted
        // otherwise show password confirm error if there is one

        const showErrors = hasSubmitted && !inProgress;
        const serverError = showErrors && error;
        const emailError = showErrors && !serverError && submittedCredentials.email === email && (!validEmail || alreadyRegistered);
        const passwordError = showErrors && !emailError && submittedCredentials.password === password && !validPassword;
        const passwordConfirmError = !passwordError && password !== passwordConfirm;
        const registerEnabled = !inProgress && !passwordConfirmError;

        const errorMessage = serverError ? error
            : emailError ? (!validEmail ? 'Invalid email address' : 'Email address already registered ... want to login?')
            : passwordError ? 'Invalid password'
            : passwordConfirmError ? 'Passwords don\'t match'
            : '';

        return (
            <Row>
                <Col xs={4} xsOffset={4}>
                    <form onSubmit={this.handleRegister}>

                        <h1>Register</h1>

                        <FormGroup controlId='email' validationState={emailError  ? 'error' : null }>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type='email'
                                value={email}
                                placeholder='someone@example.com'
                                onChange={this.handleEmailChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>

                        <FormGroup controlId='password' validationState={passwordError ? 'error' : null }>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type='password'
                                value={password}
                                onChange={this.handlePasswordChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>

                        <FormGroup controlId='passwordConfirm' validationState={passwordConfirmError ? 'error' : null }>
                            <ControlLabel>Confirm Password</ControlLabel>
                            <FormControl
                                type='password'
                                value={passwordConfirm}
                                onChange={this.handlePasswordConfirmChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>

                        { errorMessage && <Alert bsStyle='danger'>{ errorMessage }</Alert> }

                        <Button type='submit' bsStyle='primary' bsSize='large' disabled={!registerEnabled}>Register</Button>
                    </form>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials,
        frontend: state.frontend,
        response: state.response
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ register }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);