import { Offer } from './offer';
import { sortOffersBy } from '../const';
import { AuthorizationStatus } from '../const';

export type State = {
  city: string;
  offers: Offer[];
  sortBy: sortOffersBy;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
};
