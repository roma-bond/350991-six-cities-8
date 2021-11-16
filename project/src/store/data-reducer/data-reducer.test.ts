import { dataReducer, initialState } from './data-reducer';
import {
  updateOfferFavoriteStatus,
  loadOffers,
  loadOffer,
  loadNearbyOffers,
  loadReviews,
  resetOfferPageData,
  removeOffer
 } from '../action';
import { mockState, mockOffers, mockReviews } from '../../utils/mocks';
import { ActionType } from '../../types/action';

describe('Reducer: data-reducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataReducer(void 0, {type: ActionType.TestAction}))
      .toEqual(initialState);
  });

  it('should correctly update offer\'s favorite property', () => {
    const state = mockState;
    const updateOfferId = 1;
    expect(dataReducer(state, updateOfferFavoriteStatus(updateOfferId)))
      .toEqual({
        ...state,
        offers: Array.from(state.offers).map((offer) => (offer.id === updateOfferId) ? {...offer, favorite: !offer.favorite} : offer),
      });
  });

  it('should not update state if offer id is missing from the list', () => {
    const state = mockState;
    const updateOfferId = 1000;
    expect(dataReducer(state, updateOfferFavoriteStatus(updateOfferId)))
      .toEqual(state);
  });

  it('should update state on offers loading', () => {
    const state = mockState;
    const offers = mockOffers;
    expect(dataReducer(state, loadOffers(offers)))
      .toEqual({
        ...state,
        offers,
        isDataLoaded: true,
      });
  });

  it('should update currentOffer property', () => {
    const state = mockState;
    const offer = mockOffers[1];
    expect(dataReducer(state, loadOffer(offer)))
      .toEqual({
        ...state,
        currentOffer: offer,
      });
  });

  it('should update nearbyOffers property', () => {
    const state = initialState;
    const offers = mockOffers;
    expect(dataReducer(state, loadNearbyOffers(offers)))
      .toEqual({
        ...state,
        nearbyOffers: offers,
      });
  });

  it('should update reviews property', () => {
    const state = initialState;
    const reviews = mockReviews;
    expect(dataReducer(state, loadReviews(reviews)))
      .toEqual({
        ...state,
        reviews,
      });
  });

  it('should set currentOffer, nearbyOffers, reviews to default values', () => {
    const state = mockState;
    expect(dataReducer(state, resetOfferPageData()))
      .toEqual({
        ...state,
        currentOffer: null,
        nearbyOffers: [],
        reviews: [],
      });
  });

  it('should remove offer from the list', () => {
    const state = mockState;
    const offerId = 1;
    expect(dataReducer(state, removeOffer(offerId)))
      .toEqual({
        ...state,
        offers: state.offers.filter((offer) => offer.id !== offerId),
      });
  });
});
