import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkAppDispatch } from '../../types/action';
import CommentForm from '../comment-form/comment-form';
import ReviewsList from '../reviews-list/reviews-list';
import OffersMap from '../offers-map/offers-map';
import OffersList from '../offers-list/offers-list';
import LoadingScreen from '../loading-screen/loading-screen';
import SignInList from '../sign-in-list/sign-in-list';
import { fetchOfferAction } from '../../store/api-actions';
import { State } from '../../types/state';
import { Offer, Review } from '../../types/offer';
import { City, Point } from '../../types/map';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';
import { getCurrentOffer, getNearbyOffers, getReviews } from '../../store/data-reducer/selectors';

type TParams = { id: string };

const mapStateToProps = (state: State) => ({
  currentOffer: getCurrentOffer(state),
  nearbyOffers: getNearbyOffers(state),
  reviews: getReviews(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  loadServerData: (id: number) => {
    dispatch(fetchOfferAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & RouteComponentProps<TParams>;

function Room({ match, currentOffer, loadServerData, nearbyOffers, reviews, authorizationStatus }: ConnectedComponentProps): JSX.Element {
  const [city, setCity] = useState<City | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [, setDisplayedOffer] = useState<Offer | null>(null);
  const [, setDisplayedReviews] = useState<Review[]>([]);

  useEffect(() => {
    const pointsFromServer = nearbyOffers.map((offer) => {
      const { id } = offer;
      return {id, ...offer.coordinates};
    });
    setPoints(pointsFromServer);

    if (currentOffer && reviews) {
      setCity({
        title: currentOffer.city.name,
        lat: currentOffer.city.location.latitude,
        lng: currentOffer.city.location.longitude,
        zoom: currentOffer.city.location.zoom,
      });
      setDisplayedOffer(currentOffer);
      setPoints((prevPoints) => prevPoints.concat({
        id: currentOffer.id,
        ...currentOffer.coordinates,
      }));
      setDisplayedReviews(reviews);
    } else {
      loadServerData(Number(match.params.id));
    }
  }, [currentOffer, reviews, selectedPoint]);

  const onListItemHover = React.useCallback((listItemId: number) => {
    const currentPoint = points.find((point) => point.id === listItemId) || null;
    setSelectedPoint(currentPoint);
  }, []);

  const onListItemOut = React.useCallback(() => setSelectedPoint(null), []);

  if (!currentOffer || !city) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <SignInList />
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                currentOffer.images.map((image: string) => (
                  <div key={`${image}-${currentOffer.id}`} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Photo studio" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.premium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${100 * currentOffer.rating / 5}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer.maxGuests} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    currentOffer.facilities.map((facility: string, index: number) => (
                      <li key={`${facility}`} className="property__inside-item">
                        {facility}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={currentOffer.host.image} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {currentOffer.host.fullName}
                  </span>
                  {
                    currentOffer.host.pro && <span className="property__user-status">Pro</span>
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={reviews} />
                {
                  authorizationStatus === AuthorizationStatus.Auth && <CommentForm offerId={currentOffer.id} />
                }
              </section>
            </div>
          </div>
          <section className="property__map map">
            <OffersMap
              city={city}
              points={points}
              selectedPoint={selectedPoint}
              fixedOfferMarkerId={currentOffer.id}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {
              nearbyOffers && (
                <OffersList
                  offers={nearbyOffers}
                  onListItemHover={onListItemHover}
                  offersListType={'offer'}
                  onListItemOut={onListItemOut}
                />
              )
            }
          </section>
        </div>
      </main>
    </div>
  );
}

export { Room };
export default connector(Room);
