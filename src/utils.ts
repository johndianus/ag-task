import { useState, useEffect } from "react";
import { WeatherDescription } from './types';

export const useAddDelay = (input: string, delayTime: number): string => {
  const [delayValue, setDelayValue] = useState(input);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayValue(input);
    }, delayTime);
    return () => {
      clearTimeout(timeout);
    };
  }, [input, delayTime]);
  return delayValue;
}


export function getWeatherDescription(code: number): WeatherDescription {
  const weatherMapping: { [key: number]: WeatherDescription } = {
      0: { name: 'Clear sky', icon: '☀️' },
      1: { name: 'Mainly clear', icon: '🌤' },
      2: { name: 'Partly cloudy', icon: '⛅' },
      3: { name: 'Overcast', icon: '☁️' },
      45: { name: 'Fog', icon: '🌫' },
      48: { name: 'Fog', icon: '🌫' },
      51: { name: 'Drizzle', icon: '🌧' },
      53: { name: 'Drizzle', icon: '🌧' },
      55: { name: 'Drizzle', icon: '🌧' },
      61: { name: 'Rain', icon: '🌦' },
      63: { name: 'Rain', icon: '🌦' },
      65: { name: 'Rain', icon: '🌦' },
      66: { name: 'Freezing rain', icon: '❄️' },
      67: { name: 'Freezing rain', icon: '❄️' },
      71: { name: 'Snowfall', icon: '🌨' },
      73: { name: 'Snowfall', icon: '🌨' },
      75: { name: 'Snowfall', icon: '🌨' },
      80: { name: 'Showers', icon: '🌦' },
      81: { name: 'Showers', icon: '🌦' },
      82: { name: 'Showers', icon: '🌦' },
      85: { name: 'Snow showers', icon: '🌨' },
      86: { name: 'Snow showers', icon: '🌨' },
      95: { name: 'Thunderstorm', icon: '⛈' },
      96: { name: 'Thunderstorm with hail', icon: '⛈' },
      99: { name: 'Thunderstorm with hail', icon: '⛈' },
  };

  return weatherMapping[code] || { name: 'Unknown', icon: '❓' };
}


