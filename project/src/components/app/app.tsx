import {connect, ConnectedProps} from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../loading-screen/loading-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import { CITY } from '../../mocks/city';
import { State } from '../../types/state';

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const mapStateToProps = ({ authStatus, isDataLoaded }: State) => ({
  authStatus,
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const {authStatus, isDataLoaded} = props;

  if (isCheckedAuth(authStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <Main />
        </Route>
        <Route exact path={AppRoute.Login}>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites page='favorites' />}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route
          exact
          path={`${AppRoute.Offer}/:id`}
          render={(routeProps) => <Room {...routeProps} city={CITY} />}
        />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
