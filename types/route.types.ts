export interface IRecommendationParams {
  lat: number;
  lng: number;
}

export interface IRoute {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  atmName: string;
  sourceName: string;
  destinationName: string;
  distance: number;
  duration: number;
  points: {
    lat: number;
    lng: number;
  }[];
}
