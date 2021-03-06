import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';
import { CITIES, AuthorizationStatus, AppRoute } from '../../const';
import { Link } from 'react-router-dom';

type FavoritesListProps = {
  offers: Offer[];
}

type CityOffer = {
  city: string;
  offers: Offer[];
};

function FavoritesList({ offers }: FavoritesListProps): JSX.Element {
  const sortedByCityOffers = CITIES.map((city): CityOffer => ({ city, offers: []}));
  offers.forEach((offer) => {
    sortedByCityOffers
      .find((cityOffers) => cityOffers.city === offer.city.name)
      ?.offers.push(offer);
  });

  return (
    <ul className="favorites__list">
      {
        sortedByCityOffers.map((cityOffers) => {
          if (cityOffers.offers.length > 0) {
            return (
              <li key={`${cityOffers.city}-${cityOffers.offers.length}`} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={AppRoute.Main}>
                      <span>{cityOffers.city}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {cityOffers.offers.map((offer) => (
                    <OfferCard
                      key={`${offer.id}-favorite-offer-${offer.description}`}
                      offer={offer}
                      page={'favorites'}
                      authorizationStatus={AuthorizationStatus.Auth}
                    />
                  ))}
                </div>
              </li>
            );
          } else {
            return null;
          }
        })
      }
    </ul>
  );
}

export default FavoritesList;
