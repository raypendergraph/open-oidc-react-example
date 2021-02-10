import {getLastError, getLoadingUser, getUser} from "./reducer";


export function selectUser(globalState) {
  return getUser(globalState.oidc)
}

export function selectUserLoading(globalState) {
  return getLoadingUser(globalState.oidc)
}

export function selectLastError(globalState) {
  return getLastError(globalState.oidc)
}
