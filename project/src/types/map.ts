export type City = {
  title: string,
  lat: number,
  lng: number,
  zoom: number,
}

export type Coordinates = {
  lat: number,
  lng: number,
}

export type Point = Coordinates & {
  id: number,
}
