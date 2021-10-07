import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const OFFERS_AMOUNT = 312;

ReactDOM.render(
  <React.StrictMode>
    <App offersAmount={OFFERS_AMOUNT} />
  </React.StrictMode>,
  document.getElementById('root'),
);
