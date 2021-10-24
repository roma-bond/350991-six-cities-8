import { Coordinates } from './map';

export type Offer = {
  id: number,
  city: string,
  images: string[],
  premium: boolean,
  price: number,
  title: string,
  type: string,
  favorite: boolean,
  rating: number,
  description: string,
  bedrooms: number,
  maxGuests: number,
  host: {
    image: string,
    fullName: string,
    pro: boolean
  },
  facilities: string[]
  coordinates: Coordinates,
};

export type Review = {
  id: number,
  avatar: string,
  authorName: string,
  rating: number,
  date: string,
  text: string,
}
