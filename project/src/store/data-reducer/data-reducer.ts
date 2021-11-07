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
    case ActionType.UpdateOffers:
      return {
        ...state,
        offers: action.payload,
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
    default:
      return state;
  }
};

export { dataReducer };