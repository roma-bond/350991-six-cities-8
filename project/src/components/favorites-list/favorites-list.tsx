import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';
import { CITIES, AuthorizationStatus } from '../../const';

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
    const offersByCity = sortedByCityOffers.find((cityOffers) => cityOffers.city === offer.city.name);
    if (offersByCity) {
      offersByCity.offers.push(offer);
    }
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
                    <a className="locations__item-link" href="#">
                      <span>{cityOffers.city}</span>
                    </a>
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
          }
        })
      }
    </ul>
  );
}

export default FavoritesList;
