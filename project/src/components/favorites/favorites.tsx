import { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import SignInList from '../sign-in-list/sign-in-list';
import FavoritesList from '../favorites-list/favorites-list';
import { fetchOffersAction, fetchFavoriteOffersAction } from '../../store/api-actions';
import { removeOffer } from '../../store/action';
import { ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';
import { getOffers } from '../../store/data-reducer/selectors';
import { Offer } from '../../types/offer';

const mapStateToProps = (state: State) => ({
  offers: getOffers(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  loadOffers: () => {
    dispatch(fetchOffersAction());
  },
  loadFavoriteOffers: () => {
    dispatch(fetchFavoriteOffersAction());
  },
  onRemoveOffer: (id: number) => {
    dispatch(removeOffer(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Favorites({ offers, loadOffers, loadFavoriteOffers, onRemoveOffer }: PropsFromRedux): JSX.Element {
  const [displayedOffers, setDisplayedOffers] = useState<Offer[] | null>(null);

  useEffect(() => {
    if (!displayedOffers) {
      loadFavoriteOffers();
      setDisplayedOffers([]);
    } else {
      const notFavoriteOffer = offers.find((offer) => !offer.favorite);
      if (notFavoriteOffer) {
        onRemoveOffer(notFavoriteOffer.id);
      } else {
        setDisplayedOffers(offers);
      }
    }
  }, [offers]);

  if (!displayedOffers || displayedOffers.length === 0) {
    return <FavoritesEmpty onLogoClick={loadOffers} />;
  }
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link" onClick={loadOffers}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <SignInList />
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={displayedOffers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export { Favorites };
export default connector(Favorites);
