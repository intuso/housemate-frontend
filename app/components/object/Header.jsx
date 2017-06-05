import React from 'react'
import { connect } from 'react-redux'

const Header = ({name}) => (
    <div className="header"><span>{name}</span></div>
);

const mapStateToProps = (state, ownProps) => ({
    name: ownProps.name
});

export default connect(mapStateToProps)(Header)
