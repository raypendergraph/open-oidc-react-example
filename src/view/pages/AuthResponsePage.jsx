import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import oidc from "../../oidc";
import {selectLastError, selectUser, selectUserLoading} from "../../selectors";
import {userLoaded} from "../../actions";
import {Redirect} from "react-router-dom";
import {useLocation, withRouter} from "react-router";

/*
 Handles the response from the OIDC server. This component may get complicated depending on the server. I used `query`
 instead of `fragment` for the redirect data because React and anchors don't mix. This componest assumes that errors
 and tokens come back as query parameters.
 */
function AuthResponsePage({user, applicationUrl, authErrorUrl, progressView: ProgressView}) {
  const [responseError, setResponseError] = useState(undefined)
  const [isBusy, setBusy] = useState(true)
  const location = useLocation()
  useEffect(() => {
    if (user) {
      console.warn("user is present already on the login-complete stage.")
      return;
    }
    const parameters = new URLSearchParams(location.search);
    // This just checks for an error, in real life there may be other responses we have to check for here and this is
    // probably where they would go. For Azure AD the description starts with AAD... codes so you may have to switch
    // on those.
    const errorMessage = parameters.get('error_description')
    if (errorMessage) {
      setResponseError(errorMessage);
      return;
    }
    (async () => {
      try {
        await oidc.signinRedirectCallback()
      } catch (e) {
        setResponseError(`${e}`)
      } finally {
        setBusy(false)
      }
    })()
  }, [user, location.search])

  if (responseError) {
    return <Redirect to={`${authErrorUrl}?error=${encodeURIComponent(responseError)}`}/>
  }

  if (isBusy) {
    return <ProgressView/>
  }

  return <Redirect to={applicationUrl}/>
}

AuthResponsePage.defaultProps = {
  progressView: <div/>
}

function mapStateToProps(state) {
  return {
    user: selectUser(state),
    userLoading: selectUserLoading(state),
    loginFailed: !!selectLastError(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userLoaded: user => dispatch(userLoaded(user)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthResponsePage));
