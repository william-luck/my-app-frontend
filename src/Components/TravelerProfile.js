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

    useEffect(() => {
        fetch(`http://localhost:9292/traveler/${selectedTraveler}`)
            .then(r => r.json())
            .then(data => {
                setStatistics(data)
                setName(data.name)
                setPassportNumber(data.passport)
            })
    }, [dataChange, selectedTraveler])


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

    // Fixed, but need to alter the count of each country after deletion.  
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

    

    // May not work with new routes, all below are components.
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

    // Seperate function to return li's of countries, while at the same time populating the set with the continents

    return (
        <div>
            {error ? passportError() : null}
            Name: { !nameEditing ? statistics.name : nameInput()} {!nameEditing ? <Button variant="link" onClick={() => setNameEditing(true)}>Edit</Button> : null}<br></br>
            Passport number: { !passportEditing ? statistics.passport : passportInput()} {!passportEditing ? <Button variant="link" onClick={() => setPassportEditing(true)}>Edit</Button> : null}<br></br>
            Nationality: {statistics.nationality}<br></br>
            Current country: {statistics.current_country}<br></br>
            Total countries visited: {statistics.total_countries}<br></br> 
            <ul>
                {statistics ? statistics.countries_visited_names.map(country => <li>{country}</li>) : null}
            </ul> 
            Total continents visited: {statistics.total_continents}<br></br>
            <ul>
                { statistics ? statistics.continent_visit_names.map(continent => <li>{continent}</li>) : null}
            </ul> 
            Total stays to date: {statistics.total_stays}<br></br>
            Number of day trips: {statistics.day_trips}<br></br>
            Number of full trips: {statistics.full_trips}<br></br>
            Average number of stays per country: {statistics.average_stays}<br></br>
            Longest time in a country:<br></br>
            <ul>
                {statistics ? statistics.longest_visited_countries.map(country => <li>{country[0].country_name} ({statistics.longest_visit} days)</li>) : null }
            </ul>
            Shortest time in a country: <br></br>
            <ul>
                {statistics ? statistics.shortest_visited_countries.map(country => <li>{country[0].country_name} ({statistics.shortest_visit} {statistics.shortest_visit > 1 ? 'days' : 'day'})</li>) : null}
            </ul>
            <Button onClick={() => handleDelete()}>Delete Traveler from Tracker</Button>
        </div>
    )

}

export default TravelerProfile