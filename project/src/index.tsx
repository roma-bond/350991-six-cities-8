import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const offersAmount = 312;

ReactDOM.render(
  <React.StrictMode>
    <App offersAmount={offersAmount} />
  </React.StrictMode>,
  document.getElementById('root'),
);
