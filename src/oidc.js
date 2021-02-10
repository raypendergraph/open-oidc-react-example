import {Log, UserManager} from "oidc-client";

const manager = new UserManager( {
  authority: "https://your-tenant-here.b2clogin.com/your-tenant-here.onmicrosoft.com/your-policy-name-here",
  response_type: "code",
  loadUserInfo: false,
  post_logout_redirect_uri: `${window.location.origin}/oidc/login`,
  redirect_uri: `${window.location.origin}/oidc/auth-response`,
  silent_redirect_uri: `${window.location.origin}/oidc/silent-renew`,
  response_mode: "query",
  client_id: "client-id-here",
  revokeAccessTokenOnSignout: true,
  automaticSilentRenew: true,
  scope: "openid"
});

// These don't seem to work.
Log.logger = console;
Log.level = Log.DEBUG;

export default manager

