import './App.sass';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import Authenticated from "./components/Authenticated";
import AuthErrorPage from "./pages/AuthErrorPage";
import AuthResponsePage from "./pages/AuthResponsePage";
import BusyIndicator from "./components/BusyIndicator";
import LandingPage from "./pages/LandingPage";
import SilentRenewResponsePage from "./pages/SilentRenewResponsePage"
import {Redirect} from "react-router";

function App() {
  /* This router configuration could probably be done a little better */
  return (<Router>
      <Switch>
        <Route path={'/oidc/auth-error'} component={AuthErrorPage}/>
        <Route path='/oidc/silent-renew' component={SilentRenewResponsePage}/>
        <Route path={'/oidc/auth-response'}>
          <AuthResponsePage progressView={BusyIndicator}
                            authErrorUrl={'/oidc/auth-error'}
                            applicationUrl={'/app'}/>
        </Route>
        <Route path={'/oidc/logout'}>
          <LogoutPage progressView={BusyIndicator}/>
        </Route>
        {/*Other oidc callbacks go here, like password reset flows.*/}
        <Route path={'/oidc/login'}>
          <LoginPage progressView={BusyIndicator}
                     applicationUrl={'/main'}
                     authResponseUrl={'/oidc/auth-response'}/>
        </Route>
        <Route path="/app">
          <Authenticated loginUrl={"/oidc/login"} loginErrorUrl={"/oidc/auth-error"}>
            <LandingPage/>
          </Authenticated>
        </Route>
        <Route path={'/'}>
          <Redirect to={"/app"} from={"/"}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
