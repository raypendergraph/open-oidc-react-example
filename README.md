# What is this?
A proof of concept using the open source library [oidc-client](https://www.npmjs.com/package/oidc-client) to access Azure B2C instead of the (recommended) MSAL library. Actually though, this implementation should work with any OIDC provider. You may have to tweak the response url parsing a little.

# Configuration
You will need to change the settings in the oidc.js file to match your OIDC configuration.

# Running
```shell
npm install 
npm start
```
