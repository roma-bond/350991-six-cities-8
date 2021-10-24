import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reducer } from './store/reducer';
import { updateOffers } from './store/action';

const OFFERS_AMOUNT = 312;

const store = createStore(reducer, composeWithDevTools());

store.dispatch(updateOffers(offers));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offersAmount={OFFERS_AMOUNT}
        offers={offers}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
