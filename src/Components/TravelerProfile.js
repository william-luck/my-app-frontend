import React from "react"
import { useState, useEffect } from "react"

function TravelerProfile({ selectedTraveler }) {

    console.log(selectedTraveler)

    const [statistics, setStatistics] = useState('')

    useEffect(() => {
        fetch(`http://localhost:9292/traveler_statistics/${selectedTraveler}`)
            .then(r => r.json())
            .then(data => {setStatistics(data)})
    }, [])

    console.log(statistics)



    return (
        <div>
            test -- This is the traveler profile<br></br>
            Name: {statistics.name}<br></br>
            Passport number: {statistics.passport}<br></br>
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