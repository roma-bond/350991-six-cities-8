export type Coordinates = {
  lat: number,
  lng: number,
  zoom: number,
}

export type City = Coordinates & {
  title: string,
}

export type Point = Coordinates & {
  id: number,
}
