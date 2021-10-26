import { Offer } from './offer';
import { sortOffersBy } from '../const';

export type State = {
  city: string;
  offers: Offer[];
  sortBy: sortOffersBy
};
