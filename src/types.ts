
export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}
  
export interface OptionType {
  label: string;
  value: {
    latitude: number | null;
    longitude: number | null;
    name: string | null;
  };
}

export interface SearchProps {
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
}

export interface WeatherDetailsProps{
  location: Location | null;
}

export interface WeatherInfo{
  timezone: string;
  daily_units:{
    temperature_2m_max: string
    temperature_2m_min: string
    windspeed_10m_max: string
  }
  daily:{
    time: string[]
    weather_code:number[]
    temperature_2m_max:number[]
    temperature_2m_min:number[]
    windspeed_10m_max:number[]
  }
}
