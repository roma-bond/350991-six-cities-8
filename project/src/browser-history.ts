import { createBrowserHistory } from 'history';
import { store } from './index';
import { resetOfferPageData } from './store/action';
import { AppRoute } from './const';

const browserHistory = createBrowserHistory();

browserHistory.listen((location) => {
  if (location.pathname === AppRoute.Main) {
    store.dispatch(resetOfferPageData());
  }
});

export default browserHistory;
