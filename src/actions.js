import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_EXPIRING,
  SILENT_RENEW_ERROR,
  USER_LOAD_ERROR,
  USER_LOADED,
  USER_LOADING,
  USER_SIGNED_OUT,
  USER_UNLOADED
} from './constants'

// dispatched when the existing user expired
export function accessTokenExpired() {
  return {
    type: ACCESS_TOKEN_EXPIRED
  };
}

// dispatched when a user has been found in storage
export function userLoaded(user) {
  return {
    type: USER_LOADED,
    payload: user
  };
}

// dispatched when silent renew fails
// payload: the error
export function silentRenewError(error) {
  return {
    type: SILENT_RENEW_ERROR,
    payload: error
  };
}

// dispatched when the user is logged out
export function userUnloaded() {
  return {
    type: USER_UNLOADED
  };
}

// dispatched when the user is expiring (just before a silent renew is triggered)
export function accessTokenExpiring() {
  return {
    type: ACCESS_TOKEN_EXPIRING
  };
}

// dispatched when a new user is loading
export function userLoading() {
  return {
    type: USER_LOADING
  };
}

export function userSignedOut() {
  return {
    type: USER_SIGNED_OUT
  };
}

export function userLoadError(error) {
  return {
    type: USER_LOAD_ERROR,
    payload: error
  };
}

