import {connect, ConnectedProps} from 'react-redux';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../loading-screen/loading-screen';
import { getLoadedDataStatus } from '../../store/data-reducer/selectors';
import { AppRoute } from '../../const';
import { State } from '../../types/state';
import browserHistory from '../../browser-history';

const mapStateToProps = (state: State) => ({
  isDataLoaded: getLoadedDataStatus(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const { isDataLoaded } = props;

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main />
        </Route>
        <Route exact path={AppRoute.Login}>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={({ history }) => <Favorites page='favorites' />}
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
