import React, { useState, useEffect} from 'react';
import { Container} from './App.Styles'
import { Location } from './types';
import Search from './Search';

const App: React.FC = () => {  
  const [location, setLocation] = useState<Location | null>(null);

  return(
  <Container>
    <Search setLocation={setLocation}/>
    <h1>{location?.name}</h1>
  </Container>)
}
export default App;
