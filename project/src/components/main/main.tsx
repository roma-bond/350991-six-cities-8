import { useState, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import CitiesList from '../cities-list/cities-list';
import OffersList from '../offers-list/offers-list';
import OffersMap from '../offers-map/offers-map';
import { updateOffers } from '../../store/action';
import { City, Point } from '../../types/map';
import { Actions } from '../../types/action';
import { State } from '../../types/state';
import { CITIES } from '../../const';

type MainProps = {
  offersAmount: number;
  city: City;
}

const mapStateToProps = ({ offers, city }: State) => ({
  offers,
  activeCity: city,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onUpdateOffers: updateOffers,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainProps;

function Main({ offersAmount, city, activeCity, offers, onUpdateOffers }: ConnectedComponentProps): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  useEffect(() => {
    onUpdateOffers(activeCity);
  }, [activeCity]);

  const points = offers.map((offer) => {
    const { id } = offer;
    return {id, ...offer.coordinates};
  });

  const onListItemHover = (listItemId: number) => {
    const currentPoint = points.find((point) => point.id === listItemId) || null;

    setSelectedPoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
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
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={CITIES} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersAmount} places to stay in {activeCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList
                offers={offers}
                onListItemHover={onListItemHover}
                offersListType={'main'}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <OffersMap
                  city={city}
                  points={points}
                  selectedPoint={selectedPoint}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { Main };
export default connector(Main);
