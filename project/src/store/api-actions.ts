import { ThunkActionResult } from '../types/action';
import { loadOffers, requireAuthorization, requireLogout } from './action';
import { saveToken, dropToken, Token } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';
import { AuthData } from '../types/auth-data';

const convertServerData = (data: any) => data.map((serverOffer: any) => ({
  ...serverOffer,
  coordinates: {
    zoom: serverOffer.location.zoom,
    lat: serverOffer.location.latitude,
    lng: serverOffer.location.longitude,
  },
}));

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    const convertedData = convertServerData(data);
    dispatch(loadOffers(convertedData));
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
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
