import React from "react"
import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';



function TravelerProfile({ selectedTraveler, travelerCountArray, setKey, setSelectedCountry, setTravelerCountArray, setDeleteAlert, setProfileEnabled, setSelectedTraveler }) {

    const [statistics, setStatistics] = useState('')
    const [nameEditing, setNameEditing] = useState(false)
    const [passportEditing, setPassportEditing] = useState(false)
    const [name, setName] = useState('')
    const [passportNumber, setPassportNumber] = useState('')
    const [dataChange, setDataChange] = useState(true)
    const [error, setError] = useState(false)

    const [countries, setCountries] = useState([])
    const [continents, setContinents] = useState([])
    const [countryTally, setCountryTally] = useState({})

    

    useEffect(() => {
        fetch(`http://localhost:9292/traveler/${selectedTraveler}`)
            .then(r => r.json())
            .then(data => {
                setStatistics(data)
                const tempContientents = new Set()
                const tempCountries = new Set()
                const tally = {}
                data.countries.forEach(country => {
                    tally[country.country_name] = tally[country.country_name] ? tally[country.country_name] + 1 : 1
                    tempContientents.add(country.continent)
                    tempCountries.add(country.country_name)
                })
                setCountryTally(tally)
                setContinents([...tempContientents])
                setCountries([...tempCountries])

                setName(data.traveler_name)
                setPassportNumber(data.passport_number)
                // countryPopulator()
            })

    }, [dataChange, selectedTraveler])


    function countryPopulator(){

        const tempContientents = new Set()
        const tempCountries = new Set()
        const tally = {}

        // Returns an array of li's with country names, while at the same time populating a set of contininents, and a tally of country frequency.  
        statistics.countries.forEach(country => {
            tally[country.country_name] = tally[country.country_name] ? tally[country.country_name] + 1 : 1
            tempContientents.add(country.continent)
            tempCountries.add(country.country_name)
        })

        setCountryTally(tally)
        setContinents([...tempContientents])
        setCountries([...tempCountries])

        // return [...tempCountries].map(country => <li>{country}</li>)

    }

    // countryPopulator.map(country => country)

    // The above function returns an array of li's... Which we will then map over. OKAY OKAY. 

    // Seperate function to return li's of countries, while at the same time populating the set with the continents

    // let unqiqueItems = [...new Set(statistics.countries.map(country => country.country_name))]




    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setNameEditing(false)
        setPassportEditing(false)

        fetch(`http://localhost:9292/traveler/${selectedTraveler}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                traveler_name: name,
                passport_number: passportNumber
            })
        })
            .then(r => r.json())
            .then(() => setDataChange(!dataChange))
    }

    function handlePassportChange(event) {
        setPassportNumber(event.target.value)
        
    }


    function handleDelete() {
        fetch(`http://localhost:9292/traveler/${selectedTraveler}`, {
            method: "DELETE",
        })
            .then(r => r.json())
        
        setKey('home')
        setSelectedCountry(1)
        setDeleteAlert(() => deleteAlert())
        setProfileEnabled(false)

    }

    
    function passportError() {
        return (
            <Alert variant="danger" onClose={() => setError(false)} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>
                Please enter a nine-digit passport number.
                </p>
            </Alert>
        )
    }

    function deleteAlert() {
        return (
            <Alert variant="warning" onClose={() => setDeleteAlert(null)}>
                <Alert.Heading>Traveler Deleted</Alert.Heading>
                <p>
                Please select another country to display travelers.
                </p>
            </Alert>
        )
    }

    function nameInput() {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Control placeholder="Edit name.." onChange={handleNameChange} value={name} name='name'/>
            </Form>
        )
    }

    function passportInput() {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Control placeholder="Edit passport number.." onChange={handlePassportChange} value={passportNumber} name='passport number'/>
            </Form>
        )
    }

    function tallyDayFullTrips() {
        let dayTrips = []
        let fullTrips = []

        for (const [key, value] of Object.entries(countryTally)) {
            if (value === 1) {
                dayTrips.push(key)
            } else {
                fullTrips.push(key)
            }
        }

        return {
            dayTrips: dayTrips.length,
            fullTrips: fullTrips.length
        }

    }

    function longShortPopulator(match) {
        let countries = []
        for (const [key, value] of Object.entries(countryTally)) {
            if (value === match) {
                countries.push(key)
            }
        }
        return countries

    }

    function findAverageStays() {
        const values = Object.values(countryTally)
        const summedValues = values.reduce((a, b) => a + b, 0)
        return summedValues/values.length
    }

   

    
    return (
        <div>
            {error ? passportError() : null}
            Name: { !nameEditing ? statistics.traveler_name : nameInput()} {!nameEditing ? <Button variant="link" onClick={() => setNameEditing(true)}>Edit</Button> : null}<br></br>
            Passport number: { !passportEditing ? statistics.passport_number : passportInput()} {!passportEditing ? <Button variant="link" onClick={() => setPassportEditing(true)}>Edit</Button> : null}<br></br>
            Nationality: {statistics.nationality}<br></br>
            Current country: { statistics ? statistics.countries[(statistics.countries).length - 1].country_name : null }<br></br>
            Total countries visited: {countries ? countries.length : null}<br></br> 
            <ul>
                {countries ? countries.map(country => <li>{country}</li>): null}
                {/* {countries ? countryPopulator().map(country => country) : null} */}
            </ul> 
            Total continents visited: {continents ? continents.length : null}<br></br>
            <ul>
                {continents ? continents.map(continent => <li>{continent}</li>): null}
            </ul> 
            Total stays to date: {statistics ? statistics.countries.length : null }<br></br>
            Number of day trips: {countryTally ? tallyDayFullTrips().dayTrips : null}<br></br>
            Number of full trips: {countryTally ? tallyDayFullTrips().fullTrips : null}<br></br>
            Average number of stays per country: {countryTally ? Math.round(findAverageStays()) : null}<br></br>
            Longest time in a country: {countryTally ? Math.max(...Object.values(countryTally)): null} days<br></br>
            <ul>
                {countryTally ? longShortPopulator(Math.max(...Object.values(countryTally))).map(country => <li>{country}</li>) : null}
            </ul>
            Shortest time in a country: {countryTally ? Math.min(...Object.values(countryTally)): null} day<br></br>
            <ul>
                {countryTally ? longShortPopulator(Math.min(...Object.values(countryTally))).map(country => <li>{country}</li>) : null}
            </ul>
            <Button onClick={() => handleDelete()}>Delete Traveler from Tracker</Button>
        </div>
    )

}

export default TravelerProfile