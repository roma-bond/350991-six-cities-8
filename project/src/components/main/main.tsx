import { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import OffersSorting from '../offers-sorting/offers-sorting';
import CitiesList from '../cities-list/cities-list';
import OffersList from '../offers-list/offers-list';
import OffersMap from '../offers-map/offers-map';
import SignInList from '../sign-in-list/sign-in-list';
import { getSortedOffers, getCityMapCoordinates } from '../../store-utilities/offers';
import { City, Point } from '../../types/map';
import { State } from '../../types/state';
import { CITIES, DEFAULT_CITY_SETTING } from '../../const';
import { Offer } from '../../types/offer';
import { getActiveCity, getActiveSorting } from '../../store/filter-reducer/selectors';
import { getOffers } from '../../store/data-reducer/selectors';

const mapStateToProps = (state: State) => ({
  activeCity: getActiveCity(state),
  offers: getOffers(state),
  sortBy: getActiveSorting(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main({ activeCity, offers, sortBy }: PropsFromRedux): JSX.Element {
  const [displayedOffers, setDidplayedOffers] = useState<Offer[]>([]);
  const [cityMapCoordinates, setСityMapCoordinates] = useState<City>(DEFAULT_CITY_SETTING);

  let cityOffersAmount = offers.filter((offer) => offer.city.name === activeCity).length;

  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  const points = displayedOffers.map((offer) => {
    const { id } = offer;
    return {id, ...offer.coordinates};
  });

  useEffect(() => {
    setDidplayedOffers(getSortedOffers(activeCity, offers, sortBy));
    setСityMapCoordinates(getCityMapCoordinates(activeCity, offers));
    cityOffersAmount = offers.filter((offer) => offer.city.name === activeCity).length;
  }, [offers, activeCity, sortBy]);

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
              <SignInList />
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
              <b className="places__found">{cityOffersAmount} places to stay in {activeCity}</b>
              <OffersSorting />
              <OffersList
                offers={displayedOffers}
                onListItemHover={onListItemHover}
                offersListType={'main'}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <OffersMap
                  city={cityMapCoordinates}
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
