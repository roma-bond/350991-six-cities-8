import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { ThunkAppDispatch } from '../../types/action';
import { connect, ConnectedProps } from 'react-redux';
import { logoutAction } from '../../store/api-actions';

type SignInListProps = {
  authorizationStatus: AuthorizationStatus;
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLogout: () => {
    dispatch(logoutAction());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & SignInListProps;

function SignInList({ authorizationStatus, onLogout }: ConnectedComponentProps): JSX.Element {

  return (
    <ul className="header__nav-list">
      {
        authorizationStatus === AuthorizationStatus.Auth ? (
          <>
            <li className="header__nav-item user">
              <a className="header__nav-link header__nav-link--profile" href="#">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
              </a>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="#" onClick={onLogout}>
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>
        ) : (
          <li className="header__nav-item">
            <Link className="header__nav-link" to="/login">
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
