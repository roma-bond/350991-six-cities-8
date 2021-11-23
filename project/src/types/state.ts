import { Offer, Review } from './offer';
import { SortOffersBy } from '../const';
import { AuthorizationStatus } from '../const';
import { RootState } from '../store/root-reducer';

export type DataState = {
  offers: Offer[];
  isDataLoaded: boolean;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
};

export type UserState = {
  authorizationStatus: AuthorizationStatus;
};

export type FilterState = {
  sortBy: SortOffersBy;
};

export type State = RootState;
