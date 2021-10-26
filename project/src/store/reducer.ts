import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { sortOffersBy } from '../const';

export const initialState: State = {
  city: 'Paris',
  offers: [],
  sortBy: sortOffersBy.popular,
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
    default:
      return state;
  }
};

export { reducer };
