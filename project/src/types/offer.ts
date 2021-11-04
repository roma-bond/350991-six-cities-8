import { Coordinates } from './map';

export type Offer = {
  id: number;
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    name: string;
  };
  images: string[];
  premium: boolean;
  price: number;
  title: string;
  type: string;
  favorite: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  maxGuests: number;
  host: {
    id: number;
    image: string;
    fullName: string;
    pro: boolean;
  };
  facilities: string[];
  coordinates: Coordinates;
};

export type Review = {
  id: number;
  avatar: string;
  authorName: string;
  authorId: number;
  authorIsPro: boolean;
  rating: number;
  date: string;
  text: string;
}

export type ReviewPost = {
  text: string;
  rating: number;
}