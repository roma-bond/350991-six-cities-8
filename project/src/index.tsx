import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createAPI } from './services/api';
import { rootReducer } from './store/root-reducer';
import App from './components/app/app';
import { requireAuthorization } from './store/action';
import { AuthorizationStatus } from './const';

const api = createAPI(
  () => {store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth))},
);

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
