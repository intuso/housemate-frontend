import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Alert, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

import { login } from '../actions.jsx';

class Form extends React.Component {

    state = {
        email: '',
        password: ''
    };

    handleLogin = (e) => {
        e.preventDefault();
        this.props.actions.login(this.state.email, this.state.password);
    };

    handleEmailChange = (e) => this.setState({ email: e.target.value });

    handlePasswordChange = (e) => this.setState({ password: e.target.value });

    render() {

        const { email, password } = this.state;
        const submittedCredentials = this.props.credentials;
        const { error, validEmail, knownEmail, validPassword, correctPassword } = this.props.response;
        const { hasSubmitted, inProgress, next } = this.props.frontend;

        if(correctPassword) {
            window.location = next;
        }

        // if nothing submitted, show no errors
        // otherwise, show server error if there is one
        // otherwise show email error if there is one and the email hasn't changed from what was submitted
        // otherwise show password error if there is one and the password hasn't changed from what was submitted

        const showErrors = hasSubmitted && !inProgress
        const serverError = showErrors && error;
        const emailError = showErrors && !serverError && submittedCredentials.email === email && (!validEmail || !knownEmail);
        const passwordError = showErrors && !emailError && submittedCredentials.password === password && (!validPassword || !correctPassword);
        const loginEnabled = !inProgress;

        return (
            <form onSubmit={this.handleLogin}>

                <h1>Login</h1>

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

                <FormGroup controlId='password' validationState={passwordError ? 'error' : null }>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type='password'
                        value={password}
                        onChange={this.handlePasswordChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>

                { serverError && <Alert bsStyle='danger'>{error}</Alert> }
                { !serverError && emailError && !validEmail && <Alert bsStyle='danger'>Invalid email address</Alert> }
                { !serverError && emailError && validEmail && !knownEmail && <Alert bsStyle='danger'>Unknown email address ... want to register?</Alert> }
                { !serverError && !emailError && passwordError && !validPassword && <Alert bsStyle='danger'>Invalid password</Alert> }
                { !serverError && !emailError && passwordError && validPassword && !correctPassword && <Alert bsStyle='danger'>Wrong password</Alert> }

                <Button type='submit' bsStyle='primary' bsSize='large' disabled={!loginEnabled}>Login</Button>
            </form>
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
    actions: bindActionCreators({ login }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);