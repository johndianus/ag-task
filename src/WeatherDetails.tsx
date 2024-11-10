import { useState, useEffect } from "react";
import { WeatherDetailsProps, WeatherInfo } from "./types";

const WeatherDetails: React.FC<WeatherDetailsProps> = ({location}) => {
  const [weatherDet, setWeatherDet] = useState<WeatherInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchWeatherDetails = async () => {
    if(!location) return;
    setIsLoading(true);
    setIsError(false);
    try{
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location?.latitude}&longitude=${location?.longitude}&forecast_days=7&daily=temperature_2m_max,temperature_2m_min&&forecast_days=5&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,precipitation_sum,weather_code&timezone=auto`);
      const data = await response.json();
      setWeatherDet(data);
    } catch (error) {
      console.error('Error fetching weather details:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    fetchWeatherDetails();
  },[location])  

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Somewthing went wrong, please select again</div>;
  }
  return(<>{weatherDet?.timezone}</>);
}
export default WeatherDetails;
