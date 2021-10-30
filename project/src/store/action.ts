import { ActionType, ChangeCityAction, UpdateOffersAction, UpdateSortingAction, LoadOffers, RequireAuthorization, RequireLogout } from '../types/action';
import { sortOffersBy, AuthorizationStatus } from '../const';
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

export const loadOffers = (offers: Offer[]): LoadOffers => ({
  type: ActionType.LoadOffers,
  payload: offers,
});

export const requireAuthorization = (authStatus: AuthorizationStatus): RequireAuthorization => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
});

export const requireLogout = (): RequireLogout => ({
  type: ActionType.RequireLogout,
});
