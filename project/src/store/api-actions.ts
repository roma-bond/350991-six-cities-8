import { ThunkActionResult } from '../types/action';
import {
  loadOffers,
  updateOfferFavoriteStatus,
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

const normalizeOffersData = (data: any): Offer[] => data.map((serverOffer: any) => ({
  // ...serverOffer,
  id: serverOffer.id,
  city: serverOffer.city,
  images: serverOffer.images,
  premium: serverOffer.is_premium,
  price: serverOffer.price,
  title: serverOffer.title,
  type: serverOffer.type,
  favorite: serverOffer.is_favorite,
  rating: serverOffer.rating,
  description: serverOffer.description,
  bedrooms: serverOffer.bedrooms,
  maxGuests: serverOffer.max_adults,
  host: {
    id: serverOffer.host.id,
    image: serverOffer.host.avatar_url,
    fullName: serverOffer.host.name,
    pro: serverOffer.host.is_pro,
  },
  facilities: serverOffer.goods,
  coordinates: {
    zoom: serverOffer.location.zoom,
    lat: serverOffer.location.latitude,
    lng: serverOffer.location.longitude,
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
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      if (data) {
        const convertedData = normalizeOffersData(data);
        dispatch(loadOffers(convertedData));
      }
    } catch (e) {
      dispatch(loadOffers([]));
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
    dispatch(fetchOffersAction());
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };

export const submitReviewAction = (offerId: number, {text: comment, rating}: ReviewPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<{reviews: Review[]}>(`${APIRoute.Reviews}/${offerId}`, {comment, rating});
    const convertedReviewsData = normalizeReviewsData(data);
    // convertedReviewsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    dispatch(loadReviews(convertedReviewsData));
  };

export const submitFavoriteAction = (offerId: number, favorite: boolean): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const favoriteNum = favorite ? 1 : 0;
    const { data } = await api.post<any>(`${APIRoute.Favorite}/${offerId}/${favoriteNum}`);
    dispatch(updateOfferFavoriteStatus(data.id));
  };

export const fetchFavoriteOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorite);
      if (data) {
        const convertedData = normalizeOffersData(data);
        dispatch(loadOffers(convertedData));
      }
    } catch (e) {
      dispatch(loadOffers([]));
    }
  };
