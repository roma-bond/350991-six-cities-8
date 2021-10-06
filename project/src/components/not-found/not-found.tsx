import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray">
      <main className="page__main">
        <div className="container">
          <p>404 - Page not found</p>
          <p>
            <Link to={AppRoute.Root} className="header__nav-link header__nav-link--profile">Back home</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
