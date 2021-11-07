import { ActionType, Actions } from '../../types/action';
import { UserState } from '../../types/state';
import { AuthorizationStatus } from '../../const';

export const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userReducer = (state = initialState, action: Actions): UserState => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
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

export { userReducer };
