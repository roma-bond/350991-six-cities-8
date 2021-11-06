import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {State} from '../types/state';
import { sortOffersBy, AuthorizationStatus } from '../const';
import { Offer, Review } from './offer';

export enum ActionType {
  ChangeCity = 'CHANGE_CITY',
  UpdateOffers = 'UPDATE_OFFERS',
  UpdateSorting = 'UPDATE_SORTING',
  LoadOffers = 'LOAD_OFFERS',
  LoadOffer = 'LOAD_OFFER',
  RequireAuthorization = 'REQUIRE_AUTH',
  RequireLogout = 'REQUIRE_LOGOUT',
  LoadNearbyOffers = 'LOAD_NEARBY_OFFERS',
  LoadReviews = 'LOAD_COMMENTS',
  ResetOfferPageData = 'RESET_OFFER_PAGE_DATA',
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

export type LoadOffer = {
  type: ActionType.LoadOffer;
  payload: Offer;
};

export type RequireAuthorization = {
  type: ActionType.RequireAuthorization;
  payload: AuthorizationStatus;
};

export type RequireLogout = {
  type: ActionType.RequireLogout;
};

export type LoadNearbyOffers = {
  type: ActionType.LoadNearbyOffers;
  payload: Offer[];
};

export type LoadReviews = {
  type: ActionType.LoadReviews;
  payload: Review[];
};

export type ResetOfferPageData = {
  type: ActionType.ResetOfferPageData;
};

export type Actions =
  | ChangeCityAction
  | UpdateOffersAction
  | UpdateSortingAction
  | LoadOffers
  | LoadOffer
  | RequireAuthorization
  | RequireLogout
  | LoadNearbyOffers
  | LoadReviews
  | ResetOfferPageData;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
