import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

type SignInListProps = {
  authorizationStatus: AuthorizationStatus;
}

function SignInList({ authorizationStatus }: SignInListProps): JSX.Element {

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
              <a className="header__nav-link" href="#">
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

export default SignInList;
