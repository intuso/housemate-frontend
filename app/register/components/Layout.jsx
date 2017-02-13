import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Form from './Form.jsx';

class Layout extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={4} xsOffset={4}>
                    <Form />
                </Col>
            </Row>
        );
    }
}

export default Layout