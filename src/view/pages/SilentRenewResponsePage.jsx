import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useLocation} from "react-router";
import {userLoaded} from "../../actions";
import oidc from "../../oidc"

function SilentRenewResponsePage() {
  const location = useLocation()
  useEffect(() => {
    console.log(location)
    oidc.signinSilentCallback(location.search)
  })
  return <></>
}

function mapDispatchToProps(dispatch) {
  return {
    userLoaded: user => dispatch(userLoaded(user)),
  }
}

export default connect(undefined, mapDispatchToProps)(SilentRenewResponsePage)
