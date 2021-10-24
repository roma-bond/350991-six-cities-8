import { sortOffersBy } from '../const';
import { Offer } from './offer';

export enum ActionType {
  ChangeCity = 'CHANGE_CITY',
  UpdateOffers = 'UPDATE_OFFERS',
  UpdateSorting = 'UPDATE_SORTING',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: string;
};

export type UpdateOffersAction = {
  type: ActionType.UpdateOffers;
  payload: Offer[];
};

export type UpdateSortingAction = {
  type: ActionType.UpdateSorting;
  payload: sortOffersBy;
};

export type Actions = ChangeCityAction | UpdateOffersAction | UpdateSortingAction;
