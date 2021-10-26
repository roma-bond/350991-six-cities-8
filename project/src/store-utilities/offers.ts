import { sortOffersBy } from '../const';
import { Offer } from '../types/offer';

export const getSortedOffers = (city: string, offers: Offer[], sortBy: sortOffersBy) => {
  const displayedOffers = offers.filter((offer) => offer.city === city);
  switch (sortBy) {
    case sortOffersBy.cheap:
      return displayedOffers.sort((a, b) => b.price - a.price);
    case sortOffersBy.expensive:
      return displayedOffers.sort((a, b) => a.price - b.price);
    case sortOffersBy.topRated:
      return displayedOffers.sort((a, b) => a.rating - b.rating);
    default:
      return displayedOffers;
  }
};
