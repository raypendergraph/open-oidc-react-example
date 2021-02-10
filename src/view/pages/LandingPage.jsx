import React, {useState} from 'react';
import {connect} from 'react-redux'
import {selectUser} from "../../selectors";
import oidc from "../../oidc"
function LandingPage({user}) {
  const [isRenewing, setRenewing] = useState(false)
  function handleSilentRenewClick() {
    (async () => {
      setRenewing(true)
      try {
        oidc.signinSilent({redirect_uri: `${window.location.origin}/oidc/auth-response`})
        //any error should show up via the Provider callback.
      } finally {
        setRenewing(false)
      }
    })()
  }

  return <div>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
           data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href={"/"}>
            Home
          </a>

          <a className="navbar-item" href={"/"}>
            Documentation
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" href={"/"}>
              More
            </a>

            <div className="navbar-dropdown">
              <a className="navbar-item" href={"/"}>
                About
              </a>
              <a className="navbar-item" href={"/"}>
                Jobs
              </a>
              <a className="navbar-item" href={"/"}>
                Contact
              </a>
              <hr className="navbar-divider"/>
              <a className="navbar-item" href={"/"}>
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" href={'/oidc/logout'}>
                <strong>Logout</strong>
              </a>
              <a className={`button is-primary ${isRenewing ? 'is-disabled' : ''}`}  onClick={handleSilentRenewClick}>
                <strong>Renew Token</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section className="section">
      <h1 className="title">Properties for {user.profile.name}</h1>
      <div className="container">
        <table className="table">
          <thead>
          <tr>
            <th><abbr title="Property">Property</abbr></th>
            <th><abbr title="Value">Value</abbr></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>name</th>
            <td>{user.profile.name}</td>
          </tr>
          <tr>
            <th>token_type</th>
            <td>{user.token_type}</td>
          </tr>
          <tr>
            <th>sub</th>
            <td>{user.profile.sub}</td>
          </tr>
          <tr>
            <th>username</th>
            <td>{user.profile.extension_Username}</td>
          </tr>
          <tr>
            <th>email</th>
            <td>{user.profile.emails && user.profile.emails.length > 0 ? user.profile.emails[0] : "none"}</td>
          </tr>
          <tr>
            <th>expires_at</th>
            <td>{new Date(parseInt(user.expires_at) * 1000).toISOString()}</td>
          </tr>
          <tr>
            <th>expires_in</th>
            <td>{user.expires_in}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
}

function mapStateToProps(state) {
  return {
    user: selectUser(state),
  }
}

export default connect(mapStateToProps)(LandingPage);


