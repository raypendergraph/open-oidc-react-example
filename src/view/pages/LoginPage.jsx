import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import oidc from "../../oidc";
import {selectUser, selectUserLoading} from "../../selectors";
import {Redirect} from "react-router-dom";
/*
 Page that handles all aspects of the login flow.
 */
function LoginPage({user, isUserLoading, applicationUrl, authResponseUrl, progressView: ProgressView}) {
  const [errorMessage, setErrorMessage] = useState(undefined)
  const shouldLogin = !(user || isUserLoading)
  useEffect(function () {
    if (!shouldLogin) {
      return;
    }
    (async function () {
      try {
        console.log(oidc.settings)
        // Properties relevant to this is set in oidc settings.
        await oidc.signinRedirect()
      } catch (e) {
        setErrorMessage(`${e}`)
      }
    })()
  })

  if (!shouldLogin) {
    return <Redirect to={applicationUrl} />
  }

  if (errorMessage) {
    return <div>
      <p>{errorMessage}</p>
    </div>
  }

  return <ProgressView />
}

LoginPage.defaultProps = {
  applicationUrl : "/app",
  loginErrorUrl: "/user-error",
  progressView: <div/>
}

function mapStateToProps(state) {
  return {
    user: selectUser(state),
    isUserLoading: selectUserLoading(state),
  }
}

export default connect(mapStateToProps)(LoginPage);
