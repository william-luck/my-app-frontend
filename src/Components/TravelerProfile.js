import React from "react"
import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import Form from 'react-bootstrap/Form';

function TravelerProfile({ selectedTraveler }) {

    const [statistics, setStatistics] = useState('')
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(statistics.name)

    useEffect(() => {
        fetch(`http://localhost:9292/traveler_statistics/${selectedTraveler}`)
            .then(r => r.json())
            .then(data => {setStatistics(data)})
    }, [])

    function handleEditName() {
        console.log('Ive been clicked')
        setEditing(!editing)
    }

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
        
    }

    function nameInput() {
        return (
            <Form onSubmit={handleNameSubmit}>
                <Form.Control placeholder="Edit name.." onChange={handleNameChange} value={name} name='name'/>
            </Form>
        )
    }



    return (
        <div>
            Name: { !editing ? statistics.name : nameInput()} {!editing ? <Button variant="link" onClick={() => handleEditName()}>Edit</Button> : null}<br></br>
            Nationality: {statistics.nationality}<br></br>
            Passport number: {statistics.passport}<br></br>
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
        </div>
    )

}

export default TravelerProfile