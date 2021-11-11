import { ActionType, Actions } from '../../types/action';
import { DataState } from '../../types/state';

export const initialState: DataState = {
  offers: [],
  isDataLoaded: false,
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
};

const dataReducer = (state = initialState, action: Actions): DataState => {
  switch (action.type) {
    case ActionType.UpdateOfferFavoriteStatus:
      return {
        ...state,
        offers: Array.from(state.offers).map((offer) => (offer.id === action.payload) ? {...offer, favorite: !offer.favorite} : offer),
      };
    case ActionType.LoadOffers:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };
    case ActionType.LoadOffer:
      return {
        ...state,
        currentOffer: action.payload,
      };
    case ActionType.LoadNearbyOffers:
      return {
        ...state,
        nearbyOffers: action.payload,
      };
    case ActionType.LoadReviews:
      return {
        ...state,
        reviews: action.payload,
      };
    case ActionType.ResetOfferPageData:
      return {
        ...state,
        currentOffer: null,
        nearbyOffers: [],
        reviews: [],
      };
    case ActionType.RemoveOffer:
      return {
        ...state,
        offers: state.offers.filter((offer) => offer.id !== action.payload),
      };
    default:
      return state;
  }
};

export { dataReducer };
