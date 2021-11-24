import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';
import { SortOffersBy, AuthorizationStatus } from '../const';
import { Offer, Review } from './offer';

export enum ActionType {
  ChangeCity = 'data/changeCity',
  UpdateOfferFavoriteStatus = 'data/updateOfferFavoriteStatus',
  UpdateSorting = 'data/updateSorting',
  LoadOffers = 'data/loadOffers',
  LoadOffer = 'data/loadOffer',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoadNearbyOffers = 'data/loadNearbyOffers',
  LoadReviews = 'data/loadComments',
  ResetOfferPageData = 'data/resetOfferPageData',
  RemoveOffer = 'data/removeOffer',
  TestAction = 'test/unknownAction',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: string;
};

export type UpdateOfferFavoriteStatusAction = {
  type: ActionType.UpdateOfferFavoriteStatus;
  payload: number;
};

export type UpdateSortingAction = {
  type: ActionType.UpdateSorting;
  payload: SortOffersBy;
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

export type RemoveOffer = {
  type: ActionType.RemoveOffer;
  payload: number;
};

export type TestAction = {
  type: ActionType.TestAction;
};

export type Actions =
  | ChangeCityAction
  | UpdateOfferFavoriteStatusAction
  | UpdateSortingAction
  | LoadOffers
  | LoadOffer
  | RequireAuthorization
  | RequireLogout
  | LoadNearbyOffers
  | LoadReviews
  | ResetOfferPageData
  | RemoveOffer
  | TestAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
