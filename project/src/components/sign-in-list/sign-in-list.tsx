import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { logoutAction, fetchFavoriteOffersAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';
import { ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLogout: () => {
    dispatch(logoutAction());
  },
  loadFavoriteOffers: () => {
    dispatch(fetchFavoriteOffersAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function SignInList({ authorizationStatus, onLogout, loadFavoriteOffers }: PropsFromRedux): JSX.Element {

  return (
    <ul className="header__nav-list">
      {
        authorizationStatus === AuthorizationStatus.Auth ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} onClick={loadFavoriteOffers}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="#" onClick={onLogout}>
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>
        ) : (
          <li className="header__nav-item">
            <Link className="header__nav-link" to={AppRoute.Login}>
              <span className="header__signout">Sign in</span>
            </Link>
          </li>
        )
      }
    </ul>
  );
}

export { SignInList };
export default connector(SignInList);
