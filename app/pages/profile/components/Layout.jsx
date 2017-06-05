import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'react-bootstrap';

import Header from '../../../components/header/Header.jsx'
import Form from './Form.jsx';

class Layout extends React.Component {

    render() {
        return (<div>
            <Header />
            {this.props.loading ? <Loading /> : <Form />}
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.frontend.loading
    }
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

class Loading extends React.Component {
    render() {
        const { error } = this.props;
        if(error) {
            return (
                <Row>
                    <Col xs={4} xsOffset={4}>
                        <h1>Load Failed</h1>
                        <Alert bsStyle='danger'>{ error }</Alert>
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Col xs={4} xsOffset={4}>
                        <h1>Loading</h1>
                        <p>Please wait while we load your current profile</p>
                    </Col>
                </Row>
            );
        }
    }
}

const mapLoadingStateToProps = (state) => {
    return {
        error: state.response.loadError
    }
};

const mapLoadingDispatchToProps = (dispatch) => ({});

connect(mapLoadingStateToProps, mapLoadingDispatchToProps)(Loading);