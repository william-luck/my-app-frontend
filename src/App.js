import logo from './logo.svg';
import CountryList from './Components/CountryList';
import TravelersInfo from './Components/TravelersInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(1)
  const [travelerCountArray, setTravelerCountArray] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/countries')
      .then((r) => r.json())
      .then((countries) => {setCountries(countries)})
    fetch('http://localhost:9292/traveler_count')
      .then(r => r.json())
      .then(arr => setTravelerCountArray(arr))
}, [])

  return (
    <div>
      <CountryList countries={countries} setSelectedCountry={setSelectedCountry} travelerCountArray={travelerCountArray}/>
      <TravelersInfo selectedCountry={selectedCountry}/>
    </div>
  );
}

export default App;
