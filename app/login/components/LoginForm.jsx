import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

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

        if(this.props.isAuthenticated)
            window.location=this.props.onSuccess;

        const { email, password } = this.state;
        const { errors, inProgress } = this.props;

        return (
            <form onSubmit={this.handleLogin}>
                <h1>Login</h1>

                { errors.form && <div className="alert alert-danger">{errors.form}</div> }

                <TextFieldGroup
                    field="email"
                    label="Email"
                    value={email}
                    error={errors.email}
                    onChange={this.handleEmailChange}
                />

                <TextFieldGroup
                    field="password"
                    label="Password"
                    value={password}
                    error={errors.password}
                    onChange={this.handlePasswordChange}
                    type="password"
                />

                <div className="form-group"><button className="btn btn-primary btn-lg" disabled={inProgress}>Login</button></div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials,
        inProgress: state.inProgress,
        errors: state.errors,
        isAuthenticated: state.isAuthenticated,
        onSuccess: state.onSuccess
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ login }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);