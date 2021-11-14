import { system, name, internet } from 'faker';
import { DataState } from '../types/state';
import { Offer, Review } from '../types/offer';
// import {GameType} from '../const';
// import {QuestionArtist} from '../types/question';

// export const makeFakeArtistQuestion = (): QuestionArtist => ({
//   type: GameType.Artist,
//   song: {
//     artist: name.title(),
//     src: system.filePath(),
//   },
//   answers: new Array(3).fill(null).map(() => (
//     { picture: internet.avatar(), artist: name.title() }
//   )),
// } as QuestionArtist);
export const mockOffers: Offer[] = [{
  id: 1,
  city: {
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 16,
    },
    name: 'Amsterdam',
  },
  images: [system.filePath(), system.filePath()],
  premium: true,
  price: 100,
  title: 'Cool place',
  type: 'Apartment',
  favorite: false,
  rating: 3.5,
  description: 'You must visit it',
  bedrooms: 3,
  maxGuests: 5,
  host: {
    id: 1,
    image: internet.avatar(),
    fullName: name.title(),
    pro: false,
  },
  facilities: ['tv', 'washing machine'],
  coordinates: {
    lat: 0,
    lng: 0,
    zoom: 16,
  },
}, {
  id: 2,
  city: {
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 16,
    },
    name: 'Amsterdam',
  },
  images: [system.filePath(), system.filePath()],
  premium: true,
  price: 200,
  title: 'Very cool place',
  type: 'Room',
  favorite: false,
  rating: 4.5,
  description: 'Quiet peaceful place',
  bedrooms: 3,
  maxGuests: 2,
  host: {
    id: 1,
    image: internet.avatar(),
    fullName: name.title(),
    pro: false,
  },
  facilities: ['tv', 'washing machine', 'wi-fi'],
  coordinates: {
    lat: 0,
    lng: 0,
    zoom: 16,
  },
}];

export const mockReviews: Review[] = [{
  id: 1,
  avatar: internet.avatar(),
  authorName: name.title(),
  authorId: 101,
  authorIsPro: true,
  rating: 5,
  date: '10.10.2020',
  text: 'Bla Bla Bla',
}];

export const mockState: DataState = {
  offers: mockOffers,
  isDataLoaded: false,
  currentOffer: mockOffers[0],
  nearbyOffers: [mockOffers[1], mockOffers[2], mockOffers[3]],
  reviews: mockReviews,
};