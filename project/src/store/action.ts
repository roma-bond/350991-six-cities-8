import {
  ActionType,
  ChangeCityAction,
  UpdateOfferFavoriteStatusAction,
  UpdateSortingAction,
  LoadOffers,
  LoadOffer,
  RequireAuthorization,
  RequireLogout,
  LoadNearbyOffers,
  LoadReviews,
  ResetOfferPageData,
  RemoveOffer
} from '../types/action';
import { sortOffersBy, AuthorizationStatus } from '../const';
import { Offer, Review } from '../types/offer';

export const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const updateOfferFavoriteStatus = (id: number): UpdateOfferFavoriteStatusAction => ({
  type: ActionType.UpdateOfferFavoriteStatus,
  payload: id,
});

export const updateSorting = (sorting: sortOffersBy): UpdateSortingAction => ({
  type: ActionType.UpdateSorting,
  payload: sorting,
});

export const loadOffers = (offers: Offer[]): LoadOffers => ({
  type: ActionType.LoadOffers,
  payload: offers,
});

export const loadOffer = (offer: Offer): LoadOffer => ({
  type: ActionType.LoadOffer,
  payload: offer,
});

export const requireAuthorization = (authStatus: AuthorizationStatus): RequireAuthorization => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
});

export const requireLogout = (): RequireLogout => ({
  type: ActionType.RequireLogout,
});

export const loadNearbyOffers = (offers: Offer[]): LoadNearbyOffers => ({
  type: ActionType.LoadNearbyOffers,
  payload: offers,
});

export const loadReviews = (reviews: Review[]): LoadReviews => ({
  type: ActionType.LoadReviews,
  payload: reviews,
});

export const resetOfferPageData = (): ResetOfferPageData => ({
  type: ActionType.ResetOfferPageData,
});

export const removeOffer = (id: number): RemoveOffer => ({
  type: ActionType.RemoveOffer,
  payload: id,
});
