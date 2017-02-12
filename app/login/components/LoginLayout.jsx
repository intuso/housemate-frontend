import React from 'react';
import { Col, Row } from 'react-bootstrap';

import LoginForm from './LoginForm.jsx';

class Login extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={4} xsOffset={4}>
                    <LoginForm />
                </Col>
            </Row>
        );
    }
}

export default Login