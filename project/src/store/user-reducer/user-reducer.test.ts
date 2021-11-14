import { userReducer, initialState } from './user-reducer';
import { AuthorizationStatus } from '../../const';
import { ActionType } from '../../types/action';
import {
  requireAuthorization
 } from '../action';
import { mockState, mockOffers, mockReviews } from '../../utils/mocks';

describe('Reducer: user', () => {
it('without additional parameters should return initial state', () => {
    expect(userReducer(undefined, {type: ActionType.TestAction}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown});
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = initialState;
    expect(userReducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.Auth};
    expect(userReducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});