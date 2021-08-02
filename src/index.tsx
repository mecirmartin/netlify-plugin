import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import sk from './compiled-lang/sk.json';
import en from './compiled-lang/en.json';
import {
  createClient,
  Provider,
  debugExchange,
  cacheExchange,
  fetchExchange
} from 'urql';

const loadLocaleData = locale => {
  switch (locale) {
    case 'sk':
    case 'sk-SK':
      return sk;
    default:
      return en;
  }
};

const client = createClient({
  url: 'https://iteria-app-example01.herokuapp.com/v1/graphql',
  exchanges: [debugExchange, cacheExchange, fetchExchange]
});

console.log("toto", __webpack_require__.$Refresh$)

// @ts-ignore
if (!window.__skip_render) {
  const locale = navigator.language;
  const messages = loadLocaleData(locale);

  ReactDOM.render(
    <BrowserRouter>
      <Provider value={client}>
        <App locale={locale} messages={messages} />
      </Provider>     
    </BrowserRouter>,
    document.getElementById('root')
  );
}
serviceWorker.unregister();
