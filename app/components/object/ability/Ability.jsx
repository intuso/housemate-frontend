import React from 'react'
import { connect } from 'react-redux'
import { Col, Glyphicon } from 'react-bootstrap';

const Ability = ({device}) => (
    <div className="ability">
        <img src="../image/light-on.png" />
    </div>
);

const mapStateToProps = (state, ownProps) => ({
    ability: state.devices.byId[ownProps.id]
});

export default connect(mapStateToProps)(Ability)
