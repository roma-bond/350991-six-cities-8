import { ActionType, Actions } from '../../types/action';
import { FilterState } from '../../types/state';
import { sortOffersBy } from '../../const';

export const initialState: FilterState = {
  city: 'Paris',
  sortBy: sortOffersBy.popular,
};

const filterReducer = (state = initialState, action: Actions): FilterState => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {
        ...state,
        city: action.payload,
        sortBy: sortOffersBy.popular,
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

export { filterReducer };
