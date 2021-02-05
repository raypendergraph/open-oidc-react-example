import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import oidc from "./reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import OidcAuthProvider from "./view/components/OidcProvider";

const reducer = combineReducers({
  oidc
})

const middleware = composeWithDevTools();
const store = createStore(reducer, {}, middleware);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <OidcAuthProvider>
        <App />
      </OidcAuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

