import { useState } from 'react';
import { History } from 'history';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Offer } from '../../types/offer';
import { Point } from '../../types/map';
import { reviews } from '../../mocks/reviews';
import CommentForm from '../comment-form/comment-form';
import ReviewsList from '../reviews-list/reviews-list';
import OffersMap from '../offers-map/offers-map';
import OffersList from '../offers-list/offers-list';
import { State } from '../../types/state';
import { City } from '../../types/map';

interface MatchParams {
  id: string;
}

interface RoomProps extends RouteComponentProps<MatchParams> {
  city: City;
  history: History;
}

const mapStateToProps = ({ offers }: State) => ({
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & RoomProps;

function Room({ history, match, offers, city }: ConnectedComponentProps): JSX.Element {
  const currentOffer: any = offers.find((offer: Offer) => offer.id === +match.params.id);

  if (!currentOffer) {
    history.push('/');
  }

  const points = offers.map((offer) => {
    const { id } = offer;
    return {id, ...offer.coordinates};
  });

  const offerPoint = points.find((point) => point.id === currentOffer.id) || null;

  const [selectedPoint, setSelectedPoint] = useState<Point | null>(offerPoint);

  const onListItemHover = (listItemId: number) => {
    const currentPoint = points.find((point) => point.id === listItemId) || null;
    setSelectedPoint(currentPoint);
  };

  const onListItemOut = () => setSelectedPoint(null);

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
                <CommentForm />
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
            <OffersList
              offers={offers.filter((offer) => offer.id !== currentOffer.id)}
              onListItemHover={onListItemHover}
              offersListType={'offer'}
              onListItemOut={onListItemOut}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export { Room };
export default connector(Room);
