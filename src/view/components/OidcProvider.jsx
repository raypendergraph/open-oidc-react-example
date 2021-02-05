import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {
  accessTokenExpired,
  accessTokenExpiring,
  silentRenewError,
  userLoaded,
  userSignedOut,
  userUnloaded
} from "../../actions"
import oidc from '../../oidc'

/*
The role of this component is to interact with the OIDC library and client to keep Redux in sync with the OIDC
system... that's it.
 */
function OidcProvider({children, ...props}) {
  const [initializing, setInitializing] = useState(true)
  function onUserLoaded(user) {
    console.log("user was loaded" + user)
    props.userLoaded(user)
  }

  function onUserUnloaded() {
    console.log("user was unloaded")
    props.userUnloaded()
  }

  function onUserSignedOut() {
    console.log("user signed out")
    props.userSignedOut()
  }

  function onSilentRenewError(error) {
    console.error("silent renew error: " + error)
    props.silentRenewError(error)
  }

  function onAccessTokenExpired() {
    console.log("access token expired")
    props.accessTokenExpired()
  }

  function onAccessTokenExpiring() {
    console.log("access token expiring...")
    props.accessTokenExpiring()
  }

  oidc.events.addUserLoaded(onUserLoaded)
  oidc.events.addSilentRenewError(onSilentRenewError)
  oidc.events.addAccessTokenExpired(onAccessTokenExpired)
  oidc.events.addAccessTokenExpiring(onAccessTokenExpiring)
  oidc.events.addUserUnloaded(onUserUnloaded)
  oidc.events.addUserSignedOut(onUserSignedOut)

  useEffect(function () {
    // Tries to get any use cached in the store, if it's there put that in Redux and let the app load.
    (async function(){
      try {
        const user = await oidc.getUser()
        if (user){
          console.log("Loading cached user", user)
          props.userLoaded(user)
        }
      }catch (e){
        console.error(e)
      } finally {
        setInitializing(false)
      }
    }())

    // Unregister on unmount
    return function () {
      oidc.events.removeUserLoaded(onUserLoaded)
      oidc.events.removeSilentRenewError(onSilentRenewError)
      oidc.events.removeAccessTokenExpired(onAccessTokenExpired)
      oidc.events.removeAccessTokenExpiring(onAccessTokenExpiring)
      oidc.events.removeUserUnloaded(onUserUnloaded)
      oidc.events.removeUserSignedOut(onUserSignedOut)
    }
  })

  if (initializing) {
    return <></>
  }

  return React.Children.only(children)
}

function mapDispatchToProps(dispatch){
  return {
    userLoaded: user => dispatch(userLoaded(user)),
    userUnloaded: () => dispatch(userUnloaded()),
    userSignedOut: () => dispatch(userSignedOut()),
    silentRenewError: e => dispatch(silentRenewError(e)),
    accessTokenExpired: () => dispatch(accessTokenExpired()),
    accessTokenExpiring: () => dispatch(accessTokenExpiring()),
  }
}

export default connect(undefined, mapDispatchToProps)(OidcProvider)
