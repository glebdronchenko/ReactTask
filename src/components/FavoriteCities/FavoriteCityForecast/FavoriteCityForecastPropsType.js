// @flow
import type { LocationType } from '../../../types/LocationType';
import type { CachedForecastCurrentType } from '../../../types/ForecastType';

export type FavoriteCityForecastOwnPropsType = {
  location: LocationType
};

export type FavoriteCityForecastPropsType = {
  ...FavoriteCityForecastOwnPropsType,
  forecasts: CachedForecastCurrentType,
  getForecast: (locationId: number) => void,
  setFavoriteCities: (location: LocationType, isFavorite: boolean) => void
};
