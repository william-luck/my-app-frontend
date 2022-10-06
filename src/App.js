import logo from './logo.svg';
import CountryList from './Components/CountryList';
import TravelersInfo from './Components/TravelersInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(1)

  useEffect(() => {
    fetch('http://localhost:9292/countries')
    .then((r) => r.json())
    .then((countries) => {setCountries(countries)})
}, [])

  return (
    <div>
      <CountryList countries={countries} setSelectedCountry={setSelectedCountry}/>
      <TravelersInfo selectedCountry={selectedCountry}/>
    </div>
  );
}

export default App;
