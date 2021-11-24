export enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  Login = '/login',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum SortOffersBy {
  Popular = 'Popular',
  Cheap = 'Price: low to high',
  Expensive = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const DEFAULT_CITY_SETTING = {
  title: 'Paris',
  lat: 0,
  lng: 0,
  zoom: 0,
};

export enum APIRoute {
  Offers = '/hotels',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
  NotFound = '/page_not_found',
  Favorite = '/favorite',
}

export const MAX_REVIEWS = 10;
