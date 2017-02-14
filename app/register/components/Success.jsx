import React from 'react';

import { Alert, Button, Col, Row } from 'react-bootstrap';

class Success extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={4} xsOffset={4}>
                    <h1>Congratulations!</h1>
                    <p>Now you've successfully registered, the next step is to configure your profile ...</p>
                    <p>
                        <Button bsStyle='success' href='../profile/'>To my profile</Button>
                    </p>
                </Col>
            </Row>
        );
    }
}

export default Success