import { Route, Redirect, RouteProps } from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import { State } from '../../types/state';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const {render, authorizationStatus, ...restProps} = props;

  return (
    <Route
      {...restProps}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render(routeProps)
          : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export { PrivateRoute };
export default connector(PrivateRoute);
