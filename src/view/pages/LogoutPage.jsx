import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import oidc from "../../oidc";
import {selectUser, selectUserLoading} from "../../selectors";
import {Redirect} from "react-router-dom";

/*
  Page that handles only dealing with logout flow.
 */
function LogoutPage({user, userLoading, progressView: ProgressView}) {
  const shouldLogout = user || !userLoading
  const [isBusy, setBusy] = useState(true)
  useEffect(function () {
    (async function () {
      try {
        if (!shouldLogout){
          return
        }
        await oidc.signoutRedirect()
      } catch (e) {
        console.error("Logout call failed:", e)
      } finally {
        setBusy(false)
      }
    })()
  })

  if (isBusy) {
    return <ProgressView/>
  }

  return <Redirect to={"/"} />
}

function mapStateToProps(state) {
  return {
    user: selectUser(state),
    userLoading: selectUserLoading(state),
  }
}

export default connect(mapStateToProps)(LogoutPage);
