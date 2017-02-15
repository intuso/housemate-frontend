import React from 'react';
import { connect } from 'react-redux';

import Form from './Form.jsx';

class Layout extends React.Component {
    render() {
        const success = this.props.success;
        return success ? <Success /> : <Form />;
    }
}

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

const mapStateToProps = (state) => {
    return {
        success: state.response.success
    }
};

export default connect(mapStateToProps, {})(Layout);