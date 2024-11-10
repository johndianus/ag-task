import { useState, useEffect } from "react";
import { WeatherDetailsProps, WeatherInfo } from "./types";
import { Container, Grid, Row, RowIcon, Info, WeatherIcon } from "./WeatherDetails.Styles";
import { getWeatherDescription } from "./utils";

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

  if (!location) {
    return <div style={{width:'100%', textAlign:'center'}}><p>Location not selected</p></div>
  }
  if (isLoading) {
    return <div style={{width:'100%', textAlign:'center'}}><p>Loading..Please wait...</p></div>
  }
  if (isError) {
    return <div style={{width:'100%', textAlign:'center'}}><p>Somewthing went wrong, please select again</p></div>
  }
  console.log(location);
  return(
    <Container>
      {weatherDet?.daily?.time.map((t,i)=>(
        <Grid key={t}>
          <Row>
            <Info>{`${t.split('-')[2]}-${t.split('-')[1]}-${t.split('-')[0]}`}</Info>
          </Row>
          <RowIcon>
            <WeatherIcon>{getWeatherDescription(weatherDet?.daily?.weather_code[i]).icon}</WeatherIcon>
          </RowIcon>
          <Row>
            <Info>{getWeatherDescription(weatherDet?.daily?.weather_code[i]).name}</Info>
          </Row>
          <Row>
            <Info>{`${weatherDet?.daily?.temperature_2m_min[i]} ${weatherDet?.daily_units?.temperature_2m_min} - ${weatherDet?.daily?.temperature_2m_max[i]} ${weatherDet?.daily_units?.temperature_2m_max}`}</Info>
          </Row>
          <Row>
            <Info>{`${weatherDet?.daily?.windspeed_10m_max[i]} ${weatherDet?.daily_units?.windspeed_10m_max}`}</Info>
          </Row>
        </Grid>
      ))}
    </Container>
  );
}
export default WeatherDetails;
