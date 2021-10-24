import classes from './CurrentCityForecast.module.scss';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DailyForecasts from './components/DailyForecasts/DailyForecasts';
import HourlyForecastChart from './components/HourlyForecastChart/HourlyForecastChart';
import { getDay, formatTime } from '../../utils/dateTimeUtils';
import Preloader from '../Preloader/Preloader';
import { getForecastSymbolUrl } from '../../utils/forecastUtils';
import {
  FORECAST_SYMBOL_EXT,
  FORECAST_SYMBOL_LINK,
  CURRENT_CITY_FORECAST_ALT_TEXT,
  CURRENT_CITY_FORECAST_TITLE_TEXT
} from '../../utils/constants';
import { selectCurrentForecast } from '../../selectors/selectorsForecast';
import { getForecast } from '../../actions/locationsManagerActions';
import ForecastCacheController from '../../controllers/ForecastCacheController';

function CurrentCityForecast({ currentLocation, forecasts, isLoading, ...props }) {
  const currentLocationId = currentLocation.id;
  const currentForecast = selectCurrentForecast(forecasts, currentLocationId);
  const symbolUrl = getForecastSymbolUrl(currentForecast);
  const forecastTime = formatTime(currentForecast?.time);
  const forecastDay = getDay(currentForecast?.time);

  useEffect(() => {
    if (ForecastCacheController(currentLocationId, forecasts)) props.getForecast(currentLocationId);
  }, [currentLocation]);

  return (
    <div className={classes.currentCityContainer}>
      <div className={classes.currentCityInfo}>
        {isLoading ? (
          <>
            <div className={classes.forecastInfo}>
              <div className={classes.mainInfo}>
                <img
                  className={classes.icon}
                  src={symbolUrl}
                  alt={CURRENT_CITY_FORECAST_ALT_TEXT}
                  title={CURRENT_CITY_FORECAST_TITLE_TEXT}
                />
                <div className={classes.temperature}>
                  {currentCityForecast.forecast?.temperature}
                </div>
              </div>
              <div className={classes.additionalInfo}>
                <div className={classes.precitipate}>
                  Precitipate: {currentCityForecast.forecast?.precipProb}%
                </div>
                <div className={classes.humidity}>
                  Humidity: {currentCityForecast.forecast?.relHumidity}%
                </div>
                <div className={classes.wind}>
                  Wind: {currentCityForecast.forecast?.windSpeed} km/h
                </div>
              </div>
            </div>
            <div className={classes.locationInfo}>
              <div className={classes.cityName}>{currentCityForecast.city?.name}</div>
              <div className={classes.areaName}>
                {currentCityForecast.city?.adminArea} / {currentCityForecast.city?.country}
              </div>
              <div className={classes.forecastDate}>
                {forecastDay} {forecastTime}
              </div>
              <div className={classes.forecastDate}>
                {currentCityForecast.forecast?.symbolPhrase}
              </div>
            </div>
          </>
        ) : (
          <Preloader />
        )}
      </div>

      <HourlyForecastChart locationId={currentLocationId} />
      <DailyForecasts locationId={currentLocationId} />
    </div>
  );
}

const mapStateToProps = ({ locationManager: { currentLocation, forecasts }, ...state }) => {
  return {
    currentLocation,
    forecasts,
    isLoading: state.preloaderManager.currentLocation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getForecast: locationId => dispatch(getForecast(locationId))
  };
};

const WrappedCurrentCityForecast = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentCityForecast);

export default WrappedCurrentCityForecast;
