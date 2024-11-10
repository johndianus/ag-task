import React, { useState, useEffect} from 'react';
import { Container} from './App.Styles'
import Select, { SingleValue, ActionMeta } from 'react-select';
import { Location, OptionType } from './types';

const App = () =>{
  const [options, setOptions] = useState<OptionType[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<Location | null>(null);

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}search?name=${query}&count=10&language=en&format=json`);
      const data = await response.json();
      console.log(data);
      const locations = data?.results?.map((city: Location) => ({
        label: `${city.name}, ${city.country}`,
        value: { latitude: city.latitude, longitude: city.longitude, name: city.name },
      }));
      setOptions(locations?.length > 0 ? locations : [{ label: 'No city match', value: { latitude: null, longitude: null, name: null } }]);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
      fetchCities();
  }, [query]);

  const handleInputChange = (inputValue: string) => {
    if (!inputValue) {
      setIsLoading(false);
    } else {
      setQuery(inputValue);
      setIsLoading(true);
    }
  };

  const handleSelectChange = (selectedOption: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
    if (actionMeta.action === 'clear') {
      clearSelection();
    } else if (selectedOption) {
      setLocation({ name: selectedOption.value.name!, country: 'Unknown', latitude: selectedOption.value.latitude!, longitude: selectedOption.value.longitude! });
    }
  };

  const clearSelection = () => {
    setQuery('');
    setOptions([]);
    setLocation(null);
    setIsLoading(false);
  };

  return(
  <Container>
    <Select
      placeholder="Search a location..."
      options={options}
      onInputChange={handleInputChange}
      onChange={handleSelectChange}
      isLoading={isLoading}
      noOptionsMessage={() => 'No city match'}
      isClearable
    />
    <h1>{location?.name}</h1>
  </Container>)
}
export default App;
