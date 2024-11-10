import React, { useState, useEffect} from 'react';
import { Container} from './App.Styles'
import { Location } from './types';
import Search from './Search';
import WeatherDetails from './WeatherDetails';

const App: React.FC = () => {  
  const [location, setLocation] = useState<Location | null>(null);

  return(
  <Container>
    <Search setLocation={setLocation}/>
    <WeatherDetails location={location}/>
  </Container>)
}
export default App;
