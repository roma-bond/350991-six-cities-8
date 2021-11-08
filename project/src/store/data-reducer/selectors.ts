import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offer, Review } from '../../types/offer';

export const getOffers = (state: State): Offer[] => state[NameSpace.data].offers;
export const getReviews = (state: State): Review[] => state[NameSpace.data].reviews;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.data].nearbyOffers;
export const getCurrentOffer = (state: State): Offer | null => state[NameSpace.data].currentOffer;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
