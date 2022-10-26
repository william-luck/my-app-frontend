import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Container } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

import React, { useState } from 'react';
import { useEffect } from 'react';


function TravelersInfo({selectedCountry, setProfileEnabled, profileEnabled, setSelectedTraveler, deleteAlert, selectedTraveler, updatedVisitor, setUpdatedVisitor }) {

    const [selectedCountryName, setSelectedCountryName] = useState('')
    const [countryDetails, setCountryDetails] = useState('')

    useEffect(() => {
       
        fetch(`http://localhost:9292/countries/${selectedCountry}`)
            .then(r => r.json())
            .then(countryDetails => setCountryDetails(countryDetails))

    }, [selectedCountry])

    // For displaying the visits of selected traveler
    function handleClick(id) {
        setSelectedTraveler(id)
        // Removes new visit alert
        setUpdatedVisitor(false)
        // Enables the profile tab , which is not enabled until first traveler is clicked 
        setProfileEnabled(true)
    }

    // Displays on new visit added to database.
    function newVisitAlert(visit) {

        return (
            <Alert variant="warning" dismissible onClose={() => setUpdatedVisitor(false)}>
                <Alert.Heading>A new visit has been recorded for {visit.name} in {selectedCountryName} </Alert.Heading>
            </Alert>
        )
    }

    return(
        !deleteAlert ? 
        <div>
            <Container>
            {updatedVisitor ? newVisitAlert(updatedVisitor) : null}
            {countryDetails ? 
            <Tab.Container defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                    <ListGroup>
                        {countryDetails.travelers_currently_in_country.map((traveler => {
                            return <ListGroup.Item onClick={() => handleClick(traveler.id)} href={traveler.id}>{traveler.traveler_name}</ListGroup.Item>
                        }))}
                    </ListGroup>
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        {countryDetails.travelers_currently_in_country.map(traveler => {
                            return <Tab.Pane eventKey={traveler.id}>
                                {traveler.traveler_name}'s vists in {countryDetails.country_name}
                                <ul>
                                    {traveler.visits.filter(visit => visit.country_id === selectedCountry).map(visit => {
                                        return (
                                        <li>{visit.accomodation_type}
                                        <ul>
                                            <li>{visit.accomodation_name}</li>
                                            <li>{visit.address}, {countryDetails.country_name}</li> 
                                        </ul> 
                                        </li>
                                        )
                                    })
                                    }
                                </ul>
                            </Tab.Pane>
                        })}
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            : null}
            </Container>

        </div>
        : deleteAlert            
    )
}

export default TravelersInfo