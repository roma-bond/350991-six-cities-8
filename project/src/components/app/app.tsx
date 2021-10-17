import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { CITY } from '../../mocks/city';
import { Offer } from '../../types/offer';

type AppProps = {
  offersAmount: number;
  offers: Offer[];
}

function App({ offersAmount, offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <Main
            offersAmount={offersAmount}
            offers={offers}
            city={CITY}
          />
        </Route>
        <Route exact path={AppRoute.Login}>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites offers={offers} page='favorites' />}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route exact path={`${AppRoute.Offer}/:id`} component={Room} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
