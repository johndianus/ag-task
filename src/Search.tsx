import React, { useState, useEffect} from 'react';
import { Container} from './Search.Styles'
import Select, { SingleValue, ActionMeta } from 'react-select';
import { Location, OptionType } from './types';
import { useAddDelay } from './utils';
import { SearchProps } from './types';

const Search: React.FC<SearchProps> = ({setLocation}) => {  
  const [options, setOptions] = useState<OptionType[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const delayQuery = useAddDelay(query, 1000);

  const fetchCities = async () => {
    if (!delayQuery) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}search?name=${delayQuery}&count=10&language=en&format=json`);
      const data = await response.json();
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
    if (delayQuery) {
      fetchCities();
    } else {
      setOptions([]);
      setIsLoading(false);
    }
  }, [delayQuery]);

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
  </Container>)
}
export default Search;
