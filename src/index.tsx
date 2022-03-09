import React from 'react';
import ReactDOM from 'react-dom';
import './configModule.d.ts';
import GlobalStyle from './globalStyle';
import './firebase-files/initFirabse';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ContextApi from './contextApi/ContextApi';

ReactDOM.render(
  <ContextApi>
    <>
      <GlobalStyle/>
      <App />
    </>
  </ContextApi>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
