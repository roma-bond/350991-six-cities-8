import { Offer, Review } from './offer';
import { sortOffersBy } from '../const';
import { AuthorizationStatus } from '../const';

export type State = {
  city: string;
  offers: Offer[];
  sortBy: sortOffersBy;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
};
