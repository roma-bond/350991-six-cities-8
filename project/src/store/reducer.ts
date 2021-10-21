import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { offers } from '../mocks/offers';

export const initialState = {
  city: 'Paris',
  offers: [],
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload};
    case ActionType.UpdateOffers:
      return { ...state, offers};
    default:
      return state;
  }
};

export { reducer };
