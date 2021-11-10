import { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import MainEmpty from '../main-empty/main-empty';
import OffersSorting from '../offers-sorting/offers-sorting';
import CitiesList from '../cities-list/cities-list';
import OffersList from '../offers-list/offers-list';
import OffersMap from '../offers-map/offers-map';
import SignInList from '../sign-in-list/sign-in-list';
import { CITIES, DEFAULT_CITY_SETTING, sortOffersBy } from '../../const';
import { getSortedOffers, getCityMapCoordinates } from '../../store-utilities/offers';
import { City, Point } from '../../types/map';
import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { Offer } from '../../types/offer';
import { getOffers } from '../../store/data-reducer/selectors';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';
import { fetchOffersAction } from '../../store/api-actions';

const mapStateToProps = (state: State) => ({
  offers: getOffers(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  loadOffers: () => {
    dispatch(fetchOffersAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main({ offers, authorizationStatus }: PropsFromRedux): JSX.Element {
  const [activeCity, setActiveCity] = useState('Paris');
  const [sortBy, setSortBy] = useState<sortOffersBy>(sortOffersBy.popular);
  const [displayedOffers, setDidplayedOffers] = useState<Offer[]>([]);
  const [cityMapCoordinates, setСityMapCoordinates] = useState<City>(DEFAULT_CITY_SETTING);

  let cityOffersAmount = offers.filter((offer) => offer.city.name === activeCity).length;

  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  const points = displayedOffers.map((offer) => {
    const { id } = offer;
    return {id, ...offer.coordinates};
  });

  const onChangeCity = (newCity: string) => setActiveCity(newCity);
  const onUpdateSorting = (sorting: sortOffersBy) => setSortBy(sorting);

  useEffect(() => {
    setDidplayedOffers(getSortedOffers(activeCity, offers, sortBy));
    setСityMapCoordinates(getCityMapCoordinates(activeCity, offers));
    cityOffersAmount = offers.filter((offer) => offer.city.name === activeCity).length;
  }, [offers, activeCity, sortBy]);

  const onListItemHover = (listItemId: number) => {
    const currentPoint = points.find((point) => point.id === listItemId) || null;

    setSelectedPoint(currentPoint);
  };

  if (offers.length === 0) {
    return <MainEmpty />;
  }

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
            <CitiesList
              cities={CITIES}
              activeCity={activeCity}
              onChangeCity={onChangeCity}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffersAmount} places to stay in {activeCity}</b>
              <OffersSorting
                onUpdateSorting={onUpdateSorting}
              />
              <OffersList
                offers={displayedOffers}
                onListItemHover={onListItemHover}
                offersListType={'main'}
                authorizationStatus={authorizationStatus}
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
