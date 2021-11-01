import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { sortOffersBy, AuthorizationStatus } from '../const';

export const initialState: State = {
  city: 'Paris',
  offers: [],
  sortBy: sortOffersBy.popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {
        ...state,
        city: action.payload,
        sortBy: sortOffersBy.popular,
      };
    case ActionType.UpdateOffers:
      return {
        ...state,
        offers: action.payload,
      };
    case ActionType.UpdateSorting:
      return {
        ...state,
        sortBy: action.payload,
      };
    case ActionType.LoadOffers:
      return {
        ...state,
        offers: action.payload,
      };
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };
    default:
      return state;
  }
};

export { reducer };
