import React from 'react';
import { connect } from 'react-redux';

import Form from './Form.jsx';
import Success from './Success.jsx';

class Layout extends React.Component {
    render() {
        const success = this.props.success;
        return success ? <Success /> : <Form />;
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.response.success
    }
};

export default connect(mapStateToProps, {})(Layout);