import './App.sass';
import {BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import Authenticated from "./components/Authenticated";
import AuthResponse from "./components/AuthResponse";
import AuthError from "./pages/AuthErrorPage";
import LandingPage from "./pages/LandingPage";
import {Redirect} from "react-router";
import BusyIndicator from "./components/BusyIndicator";

function App() {
  return (<Router>
      <Switch>
        <Route path={'/oidc/auth-error'} component={AuthError} />
        <Route path={'/oidc/auth-response'} >
          <AuthResponse progressView={BusyIndicator}
                        authErrorUrl={'/oidc/auth-error'}
                        applicationUrl={'/app'}/>
        </Route>
        <Route path={'/oidc/logout'} >
          <LogoutPage progressView={BusyIndicator} />
        </Route>
        {/*Other oidc callbacks go here, like password reset flows.*/}
        <Route path={'/oidc/login'}>
          <LoginPage progressView={BusyIndicator}
                 applicationUrl={'/main'}
                 authResponseUrl={'/oidc/auth-response'}/>
        </Route>
        <Route path="/app">
          <Authenticated loginUrl={"/oidc/login"} loginErrorUrl={"/oidc/auth-error"}>
            <LandingPage />
          </Authenticated>
        </Route>
        <Route path={'/'}>
          <Redirect to={"/app"} from={"/"} />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
