import { SortOffersBy } from '../const';
import { Offer } from '../types/offer';
import { City } from '../types/map';

export const getSortedOffers = (city: string, offers: Offer[], sortBy: SortOffersBy): Offer[] => {
  const displayedOffers = offers.filter((offer) => offer.city.name === city);
  switch (sortBy) {
    case SortOffersBy.Cheap:
      return displayedOffers.sort((a, b) => a.price - b.price);
    case SortOffersBy.Expensive:
      return displayedOffers.sort((a, b) => b.price - a.price);
    case SortOffersBy.TopRated:
      return displayedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return displayedOffers;
  }
};

export const getCityMapCoordinates = (activeCity: string, offers: Offer[]): City => {
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
