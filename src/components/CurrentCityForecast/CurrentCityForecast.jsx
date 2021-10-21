import classes from './CurrentCityForecast.module.scss';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DailyForecasts from './components/DailyForecasts/DailyForecasts';
import HourlyForecastChart from './components/HourlyForecastChart/HourlyForecastChart';
import { getDay, formatTime } from '../../utils/dateTimeUtils';
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

function CurrentCityForecast({ currentLocation, forecasts, ...props }) {
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
        <div className={classes.forecastInfo}>
          <div className={classes.mainInfo}>
            <img
              className={classes.icon}
              src={symbolUrl}
              alt={CURRENT_CITY_FORECAST_ALT_TEXT}
              title={CURRENT_CITY_FORECAST_TITLE_TEXT}
            />
            <div className={classes.temperature}>{currentForecast?.temperature}</div>
          </div>
          <div className={classes.additionalInfo}>
            <div className={classes.precitipate}>Precitipate: {currentForecast?.precipProb}%</div>
            <div className={classes.humidity}>Humidity: {currentForecast?.relHumidity}%</div>
            <div className={classes.wind}>Wind: {currentForecast?.windSpeed} km/h</div>
          </div>
        </div>
        <div className={classes.locationInfo}>
          <div className={classes.cityName}>{currentLocation?.name}</div>
          <div className={classes.areaName}>
            {currentLocation?.adminArea} / {currentLocation?.country}
          </div>
          <div className={classes.forecastDate}>
            {forecastDay} {forecastTime}
          </div>
          <div className={classes.forecastDate}>{currentForecast?.symbolPhrase}</div>
        </div>
      </div>

      <HourlyForecastChart locationId={currentLocationId} />
      <DailyForecasts locationId={currentLocationId} />
    </div>
  );
}

const mapStateToProps = ({ locationManager: { currentLocation, forecasts } }) => {
  return {
    currentLocation,
    forecasts
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
