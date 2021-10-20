import { useState } from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  onListItemHover: (listItemId: number) => void;
  offersListType: string;
  onListItemOut?: () => void;
}

function OffersList({ offers, onListItemHover, offersListType, onListItemOut }: OffersListProps): JSX.Element {
  const [, setActiveId] = useState(offers[0].id);

  let extraListClass = '';

  if (offersListType === 'main') {
    extraListClass = 'cities__places-list tabs__content';
  } else if (offersListType === 'offer') {
    extraListClass = 'near-places__list';
  }

  return (
    <div className={`${extraListClass} places__list`}>
      {
        offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onMouseOver={() => setActiveId(offer.id)}
            onMouseEnter={() => onListItemHover(offer.id)}
            onMouseOut={onListItemOut}
            page='main'
          />),
        )
      }
    </div>
  );
}

export default OffersList;
