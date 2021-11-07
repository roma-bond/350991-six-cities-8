import { ThunkActionResult } from '../types/action';
import {
  loadOffers,
  loadOffer,
  loadNearbyOffers,
  loadReviews,
  requireAuthorization,
  requireLogout
} from './action';
import { saveToken, dropToken, Token } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { Offer, Review } from '../types/offer';
import { AuthData } from '../types/auth-data';
import browserHistory from '../browser-history';
import { ReviewPost } from '../types/offer';

const normalizeOffersData = (data: any) => data.map((serverOffer: any) => ({
  ...serverOffer,
  coordinates: {
    zoom: serverOffer.location.zoom,
    lat: serverOffer.location.latitude,
    lng: serverOffer.location.longitude,
  },
  facilities: serverOffer.goods,
  favorite: serverOffer.is_favorite,
  premium: serverOffer.is_premium,
  maxGuests: serverOffer.max_adults,
  host: {
    id: serverOffer.host.id,
    image: serverOffer.host.avatar_url,
    fullName: serverOffer.host.name,
    pro: serverOffer.host.is_pro,
  },
}));

const normalizeOfferData = (data: any) => ({
  ...data,
  coordinates: {
    zoom: data.location.zoom,
    lat: data.location.latitude,
    lng: data.location.longitude,
  },
  facilities: data.goods,
  favorite: data.is_favorite,
  premium: data.is_premium,
  maxGuests: data.max_adults,
  host: {
    id: data.host.id,
    image: data.host.avatar_url,
    fullName: data.host.name,
    pro: data.host.is_pro,
  },
});

const normalizeReviewsData = (data: any): Review[] => data.map((review: any) => ({
  ...review,
  text: review.comment,
  authorId: review.user.id,
  authorIsPro: review.user.is_pro,
  authorName: review.user.name,
  avatar: review.user.avatar_url,
}));

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    if (data) {
      const convertedData = normalizeOffersData(data);
      dispatch(loadOffers(convertedData));
    }
  };

export const fetchOfferAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data: offerData } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      const convertedOfferData = normalizeOfferData(offerData);
      dispatch(loadOffer(convertedOfferData));
      const { data: nearbyData } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      const convertedNearbyData = normalizeOffersData(nearbyData);
      dispatch(loadNearbyOffers(convertedNearbyData));
      const { data: reviewsData } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
      const convertedReviewsData = normalizeReviewsData(reviewsData);
      dispatch(loadReviews(convertedReviewsData));
    } catch (error) {
      browserHistory.push(APIRoute.NotFound);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    browserHistory.push(AppRoute.Main);
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };

export const submitReviewAction = (offerId: number, {text: comment, rating}: ReviewPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<{reviews: Review[]}>(`${APIRoute.Reviews}/${offerId}`, {comment, rating});
    const convertedReviewsData = normalizeReviewsData(data);
    dispatch(loadReviews(convertedReviewsData));
  };
