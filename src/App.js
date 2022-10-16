import logo from './logo.svg';
import CountryList from './Components/CountryList';
import TravelersInfo from './Components/TravelersInfo';
import TravelerProfile from './Components/TravelerProfile';
import NewTravelerForm from './Components/NewTravelerForm';
import NewVisitForm from './Components/NewVisitForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container } from 'react-bootstrap';


function App() {

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(1)
  const [travelerCountArray, setTravelerCountArray] = useState([])
  const [profileEnabled, setProfileEnabled] = useState(false)
  const [selectedTraveler, setSelectedTraveler] = useState(null)
  const [key, setKey] = useState('home')
  const [deleteAlert, setDeleteAlert] = useState(null)
  const [newTraveler, setNewTraveler] = useState(false)

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
      id="justify-tab-example"
      activeKey={key}
      onSelect={k => setKey(k)}
      className="mb-3"
      justify
    >
      <Tab eventKey="home" title="Countries">
        <CountryList countries={countries} setSelectedCountry={setSelectedCountry} travelerCountArray={travelerCountArray} setDeleteAlert={setDeleteAlert}/>
        <TravelersInfo 
          selectedCountry={selectedCountry} 
          setProfileEnabled={setProfileEnabled} 
          profileEnabled={profileEnabled}
          setSelectedTraveler={setSelectedTraveler}
          deleteAlert={deleteAlert}
          />
      </Tab>
      {profileEnabled ? 
        <Tab eventKey="profile" title="Traveler Profile">
        <TravelerProfile selectedTraveler={selectedTraveler} travelerCountArray={travelerCountArray} setKey={setKey} setSelectedCountry={setSelectedCountry} setTravelerCountArray={setTravelerCountArray} setDeleteAlert={setDeleteAlert} setProfileEnabled={setProfileEnabled}/>
        </Tab> 
        :
        <Tab eventKey="profile" title="Traveler Profile" disabled>
        {/* <Sonnet /> */}
        </Tab>
        }
      <Tab eventKey="add-traveler" title="Add Traveler">
        <NewTravelerForm countries={countries} setKey={setKey} setNewTraveler={setNewTraveler}/>
      </Tab>
      <Tab eventKey="add-visit" title="Add Visit">
        <NewVisitForm countries={countries} newTraveler={newTraveler} setNewTraveler={setNewTraveler}/>
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
