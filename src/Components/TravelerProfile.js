import React from "react"
import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';



function TravelerProfile({ selectedTraveler, travelerCountArray, setKey, setSelectedCountry, setTravelerCountArray, setDeleteAlert }) {

    const [statistics, setStatistics] = useState('')
    const [editing, setEditing] = useState(false)
    const [passportEditing, setPassportEditing] = useState(false)
    const [name, setName] = useState(statistics.name)
    const [passportNumber, setPassportNumber] = useState(statistics.passport)
    const [dataChange, setDataChange] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:9292/traveler_statistics/${selectedTraveler}`)
            .then(r => r.json())
            .then(data => {setStatistics(data)})
    }, [dataChange])


    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handleNameSubmit(e) {
        e.preventDefault()
        setEditing(!editing)

        fetch(`http://localhost:9292/traveler_name/${selectedTraveler}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                traveler_name: name
            })
        })
            .then(r => r.json())
            .then(changedTraveler => console.log(changedTraveler))
            .then(() => setDataChange(!dataChange))
    }

    function handlePassportChange(event) {
        setPassportNumber(event.target.value)
        
    }

    function handlePassportSubmit(e) {
        e.preventDefault()

        if (passportNumber.length !== 9) {
            setError(true)
        } else {
            console.log('changed passport number')
            setError(false)

            setPassportEditing(!passportEditing)

            fetch(`http://localhost:9292/traveler_passport/${selectedTraveler}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    passport_number: passportNumber
                })
            })
                .then(r => r.json())
                .then(changedTraveler => console.log(changedTraveler))
                .then(() => setDataChange(!dataChange))

            }


        
    }

    function handleDelete() {
        fetch(`http://localhost:9292/traveler_delete/${selectedTraveler}`, {
            method: "DELETE",
        })
            .then(r => r.json())
            .then(info => console.log(info))
        // For getting the id of the current country the traveler was deleted from, to change count by each country of main page
        fetch(`http://localhost:9292/deleted_traveler_country/${selectedTraveler}`)
            .then(r => r.json())
            .then(country => {
                let modifiedTravelerCount = [...travelerCountArray]
                modifiedTravelerCount[country.id-1] = modifiedTravelerCount[country.id-1] - 1;
                setTravelerCountArray(modifiedTravelerCount)
            })

        setKey('home')
        setSelectedCountry(1)
        setDeleteAlert(() => deleteAlert())

        // From this page we have the selected traveler ID... 
        // Get the current country, find it's ID, remove -1 from the index of where it came from? 
    }

    function nameInput() {
        return (
            <Form onSubmit={handleNameSubmit}>
                <Form.Control placeholder="Edit name.." onChange={handleNameChange} value={name} name='name'/>
            </Form>
        )
    }

    function passportInput() {
        return (
            <Form onSubmit={handlePassportSubmit}>
                <Form.Control placeholder="Edit passport number.." onChange={handlePassportChange} value={passportNumber} name='passport number'/>
            </Form>
        )
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



    return (
        <div>
            {error ? passportError() : null}
            Name: { !editing ? statistics.name : nameInput()} {!editing ? <Button variant="link" onClick={() => setEditing(!editing)}>Edit</Button> : null}<br></br>
            Passport number: { !passportEditing ? statistics.passport : passportInput()} {!passportEditing ? <Button variant="link" onClick={() => setPassportEditing(!passportEditing)}>Edit</Button> : null}<br></br>
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
            <Button onClick={() => handleDelete()}>Test</Button>
        </div>
    )

}

export default TravelerProfile