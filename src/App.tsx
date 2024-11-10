import React, { useState, useEffect} from 'react';
import { Container} from './App.Styles'
import Select from 'react-select';

interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface OptionType {
  label: string;
  value: {
    latitude: number | null;
    longitude: number | null;
    name: string | null;
  };
}

const App = () =>{
  const [options, setOptions] = useState<OptionType[]>([]);
  const fetchCities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}search?name=Berlin&count=10&language=en&format=json`);
      const data = await response.json();
      const locations = data?.results?.map((city: Location) => ({
        label: `${city.name}, ${city.country}`,
        value: { latitude: city.latitude, longitude: city.longitude, name: city.name },
      }));
      setOptions(locations?.length > 0 ? locations : [{ label: 'No city match', value: { latitude: null, longitude: null, name: null } }]);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }

  useEffect(() => {
      fetchCities();
  }, []);

  return(
  <Container>
    <Select
      placeholder="Search a location..."
      options={options}
      noOptionsMessage={() => 'No city match'}
    />
  </Container>)
}
export default App;
