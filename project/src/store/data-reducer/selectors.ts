import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offer, Review } from '../../types/offer';
import { MAX_REVIEWS } from '../../const';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;

export const getReviews = (state: State): Review[] => {
  const allReviews = state[NameSpace.Data]
    .reviews
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allReviews.slice(0, MAX_REVIEWS);
};

export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Data].nearbyOffers;

export const getCurrentOffer = (state: State): Offer | null => state[NameSpace.Data].currentOffer;

export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
