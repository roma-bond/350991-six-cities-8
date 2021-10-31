import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {State} from '../types/state';
import { sortOffersBy, AuthorizationStatus } from '../const';
import { Offer } from './offer';

export enum ActionType {
  ChangeCity = 'CHANGE_CITY',
  UpdateOffers = 'UPDATE_OFFERS',
  UpdateSorting = 'UPDATE_SORTING',
  LoadOffers = 'LOAD_OFFERS',
  RequireAuthorization = 'REQUIRE_AUTH',
  RequireLogout = 'REQUIRE_LOGOUT',
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

export type LoadOffers = {
  type: ActionType.LoadOffers;
  payload: Offer[];
};

export type RequireAuthorization = {
  type: ActionType.RequireAuthorization;
  payload: AuthorizationStatus;
};

export type RequireLogout = {
  type: ActionType.RequireLogout;
};

export type Actions =
  | ChangeCityAction
  | UpdateOffersAction
  | UpdateSortingAction
  | LoadOffers
  | RequireAuthorization
  | RequireLogout;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
