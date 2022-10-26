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
  const [profileEnabled, setProfileEnabled] = useState(false)
  const [selectedTraveler, setSelectedTraveler] = useState(null)
  const [key, setKey] = useState('home')
  const [deleteAlert, setDeleteAlert] = useState(null)
  const [newTraveler, setNewTraveler] = useState('')
  const [updatedVisitor, setUpdatedVisitor] = useState(false)
  const [contentLoaded, setContentLoaded] = useState(false)
 
  useEffect(() => {
    fetch('http://localhost:9292/countries')
      .then((r) => r.json())
      .then((countries) => {setCountries(countries)})
      .then(() => setContentLoaded(true))
}, [])


  return (
    <Container>

    <Tabs activeKey={key} onSelect={k => setKey(k)} className="mb-3" justify>

      <Tab eventKey="home" title="Countries">
        {contentLoaded ? <CountryList 
          countries={countries} 
          setSelectedCountry={setSelectedCountry} 
          setDeleteAlert={setDeleteAlert} 
          setUpdatedVisitor={setUpdatedVisitor}/> : 'Please wait, loading countries and travelers from database...'}
        {contentLoaded ? <TravelersInfo 
          selectedCountry={selectedCountry} 
          setProfileEnabled={setProfileEnabled} 
          profileEnabled={profileEnabled}
          setSelectedTraveler={setSelectedTraveler}
          deleteAlert={deleteAlert}
          selectedTraveler={selectedTraveler}
          updatedVisitor={updatedVisitor}
          setUpdatedVisitor={setUpdatedVisitor}
          /> : null}
      </Tab>

      {profileEnabled ? 
        <Tab eventKey="profile" title="Traveler Profile">
        <TravelerProfile 
          selectedTraveler={selectedTraveler} 
          setKey={setKey} 
          setSelectedCountry={setSelectedCountry} 
          setDeleteAlert={setDeleteAlert} 
          setProfileEnabled={setProfileEnabled} 
          setSelectedTraveler={setSelectedTraveler}/>
        </Tab> 
        :
        <Tab eventKey="profile" title="Traveler Profile" disabled>
        </Tab>
        }

      <Tab eventKey="add-traveler" title="Add Traveler">
        <NewTravelerForm 
          countries={countries} 
          setKey={setKey} 
          setNewTraveler={setNewTraveler} />
      </Tab>

      <Tab eventKey="add-visit" title="Add Visit">
        <NewVisitForm 
          countries={countries} 
          newTraveler={newTraveler} 
          setKey={setKey} 
          setNewTraveler={setNewTraveler} 
          setSelectedCountry={setSelectedCountry} 
          setSelectedTraveler={setSelectedTraveler} 
          setUpdatedVisitor={setUpdatedVisitor} />
      </Tab>

    </Tabs>

    </Container>
    
  );
}

export default App;
