import logo from './logo.svg';
import CountryList from './Components/CountryList';
import TravelersInfo from './Components/TravelersInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container } from 'react-bootstrap';



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
    <Container>

    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="home" title="Home">
        <CountryList countries={countries} setSelectedCountry={setSelectedCountry} travelerCountArray={travelerCountArray}/>
        <TravelersInfo selectedCountry={selectedCountry}/>
      </Tab>
      <Tab eventKey="profile" title="Profile">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="longer-tab" title="Loooonger Tab">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        {/* <Sonnet /> */}
      </Tab>
    </Tabs>

    </Container>




    // <div>
    //   <CountryList countries={countries} setSelectedCountry={setSelectedCountry} travelerCountArray={travelerCountArray}/>
    //   <TravelersInfo selectedCountry={selectedCountry}/>
    // </div>
  );
}

export default App;
