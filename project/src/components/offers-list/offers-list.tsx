import { useState } from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  onListItemHover: (listItemId: number) => void;
}

function OffersList({ offers, onListItemHover }: OffersListProps): JSX.Element {
  const [, setActiveId] = useState(offers[0].id);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onMouseOver={() => setActiveId(offer.id)}
            onMouseEnter={() => onListItemHover(offer.id)}
            page='main'
          />),
        )
      }
    </div>
  );
}

export default OffersList;
