import { ActionType, ChangeCityAction, UpdateOffersAction } from '../types/action';

export const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const updateOffers = (city: string): UpdateOffersAction => ({
  type: ActionType.UpdateOffers,
});
