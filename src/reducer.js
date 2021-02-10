import {
  ACCESS_TOKEN_EXPIRED,
  SILENT_RENEW_ERROR,
  USER_LOADED,
  USER_LOADING,
  USER_SIGNED_OUT,
  USER_UNLOADED,
} from "./constants";

const initialState = {
  user: undefined,
  lastError: undefined,
  isLoadingUser: false,
  metadata: undefined
};

const stateFunctions = {
  [ACCESS_TOKEN_EXPIRED]: accessTokenExpiredState,
  [SILENT_RENEW_ERROR]: silentRenewErrorState,
  [USER_UNLOADED]: userUnloadedState,
  [USER_SIGNED_OUT]: userSignedOutState,
  [USER_LOADED]: userLoadedState,
  [USER_LOADING]: userLoadingState,
}

export default function reducer(state = initialState, action) {
  const actionStateFunction = stateFunctions[action.type];
  if (actionStateFunction) {
    return {...state, ...actionStateFunction(action)}
  }
  return state;
}

//state transformation functions
function userLoadingState(action) {
  return {
    isLoadingUser: true,
    lastError: undefined
  }
}

function userLoadedState(action) {
  return {
    user: action.payload,
    isLoadingUser: false
  }
}

function userSignedOutState(action) {
  return {
    user: undefined,
    isLoadingUser: false
  }
}

function userUnloadedState(action) {
  return {
    user: undefined,
    isLoadingUser: false
  }
}

function silentRenewErrorState(action) {
  return {
    user: undefined,
    isLoadingUser: false,
    lastError: action.payload
  }
}

// function accessTokenExpiringState(action){
//   return {
//     isLoadingUser: false
//   }
// }

function accessTokenExpiredState(action) {
  return {
    user: undefined,
    isLoadingUser: false
  }
}

export function getUser(localState) {
  return localState.user;
}

export function getLastError(localState) {
  return localState.lastError;
}

export function getLoadingUser(localState) {
  return !!localState.isLoadingUser;
}
