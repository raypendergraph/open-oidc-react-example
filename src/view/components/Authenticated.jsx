import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {selectLastError, selectUser} from "../../selectors";

function Authenticated({children, user, loginUrl, loginErrorUrl, lastError}) {
  if (lastError) {
    return <Redirect to={loginErrorUrl}/>
  }
  if (!user) {
    return <Redirect to={loginUrl}/>
  }
  return React.Children.only(children);
}

function mapStateToProps(state) {
  return {
    user: selectUser(state),
    lastError: selectLastError(state)
  }
}

export default connect(mapStateToProps)(Authenticated)
