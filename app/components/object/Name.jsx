import React from 'react'
import { connect } from 'react-redux'

const Name = ({name}) => (
    <div className="name"><span>{name}</span></div>
);

const mapStateToProps = (state, ownProps) => ({
    name: ownProps.name
});

export default connect(mapStateToProps)(Name)
