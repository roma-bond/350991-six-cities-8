import { sortOffersBy } from '../const';
import { Offer } from '../types/offer';

export const getSortedOffers = (city: string, offers: Offer[], sortBy: sortOffersBy): Offer[] => {
  const displayedOffers = offers.filter((offer) => offer.city.name === city);
  switch (sortBy) {
    case sortOffersBy.cheap:
      return displayedOffers.sort((a, b) => a.price - b.price);
    case sortOffersBy.expensive:
      return displayedOffers.sort((a, b) => b.price - a.price);
    case sortOffersBy.topRated:
      return displayedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return displayedOffers;
  }
};

export const getCityMapCoordinates = (activeCity: string, offers: Offer[]) => {
  const cityMapOffer = offers.find((offer) => offer.city.name === activeCity);
  return (cityMapOffer)
    ? { ...cityMapOffer.coordinates, title: activeCity }
    : {
      title: activeCity,
      lat: 0,
      lng: 0,
      zoom: 0,
    };
};
