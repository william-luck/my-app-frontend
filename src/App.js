import logo from './logo.svg';
import CountryList from './Components/CountryList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {

  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/countries')
    .then((r) => r.json())
    .then((countries) => {setCountries(countries)})
}, [])

  return (
    <div>
      <CountryList countries={countries}/>
    </div>
  );
}

export default App;
