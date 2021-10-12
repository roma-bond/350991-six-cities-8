export type Offer = {
  id: number,
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
};

export type Review = {
  avatar: string,
  authorName: string,
  rating: number,
  date: string,
  text: string,
}
