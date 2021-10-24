import { ActionType, ChangeCityAction, UpdateOffersAction, UpdateSortingAction } from '../types/action';
import { sortOffersBy } from '../const';
import { Offer } from '../types/offer';

export const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const updateOffers = (offers: Offer[]): UpdateOffersAction => ({
  type: ActionType.UpdateOffers,
  payload: offers,
});

export const updateSorting = (sorting: sortOffersBy): UpdateSortingAction => ({
  type: ActionType.UpdateSorting,
  payload: sorting,
});
