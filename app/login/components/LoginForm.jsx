import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Alert, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

import TextFieldGroup from '../../common/TextFieldGroup.jsx';
import { login } from '../actions.jsx';

class LoginForm extends React.Component {

    state = {
        email: this.props.credentials.email,
        password: this.props.credentials.password
    };

    handleLogin = (e) => {
        e.preventDefault();
        this.props.actions.login(this.state.email, this.state.password);
    };

    handleEmailChange = (e) => this.setState({ email: e.target.value });

    handlePasswordChange = (e) => this.setState({ password: e.target.value });

    render() {

        if(this.props.isAuthenticated) {
            window.location = this.props.onSuccess;
        }

        const { email, password } = this.state;
        const { error, inProgress } = this.props;

        return (
            <form onSubmit={this.handleLogin}>

                <h1>Login</h1>

                { error && <Alert bsStyle="danger">{error}</Alert> }

                <FormGroup controlId="email">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        value={email}
                        placeholder="someone@example.com"
                        onChange={this.handleEmailChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="password">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={password}
                        onChange={this.handlePasswordChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>

                <Button type="submit" bsStyle="primary" bsSize="large" disabled={inProgress}>Login</Button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials,
        inProgress: state.inProgress,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        onSuccess: state.onSuccess
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ login }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);