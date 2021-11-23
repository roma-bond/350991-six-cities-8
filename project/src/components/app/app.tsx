import {connect, ConnectedProps} from 'react-redux';
import { Router as BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';
import { State } from '../../types/state';
import browserHistory from '../../browser-history';

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const { authorizationStatus } = props;

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main />
        </Route>
        <Route
          exact
          path={AppRoute.Login}
          render={() => (
            authorizationStatus !== AuthorizationStatus.Auth
              ? <SignIn />
              : <Redirect to={AppRoute.Main}/>
          )}
        />
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites />}
        />
        <Route
          exact
          path={`${AppRoute.Offer}/:id`}
          render={(routeProps) => <Room {...routeProps} />}
        />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
