import React, { useState } from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';
import { AuthorizationStatus } from '../../const';

type OffersListProps = {
  offers: Offer[];
  onListItemHover: (listItemId: number) => void;
  offersListType: string;
  onListItemOut?: () => void;
  authorizationStatus?: AuthorizationStatus;
  nearbyId?: number;
}

function OffersList({ offers, onListItemHover, offersListType, onListItemOut, authorizationStatus, nearbyId }: OffersListProps): JSX.Element {
  const [, setActiveId] = useState(offers.length > 0 ? offers[0].id : null);

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
            page={offersListType}
            authorizationStatus={authorizationStatus}
            nearbyId={nearbyId}
          />),
        )
      }
    </div>
  );
}

export default React.memo(OffersList);
