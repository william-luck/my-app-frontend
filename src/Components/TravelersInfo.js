import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Container } from 'react-bootstrap';

import React, { useState } from 'react';
import { useEffect } from 'react';


function TravelersInfo({selectedCountry}) {

    const [travelersInCountry, setTravelersInCountry] = useState([])
    const [visitsOfSelectedTravler, setVistsOfSelectedTraveler] = useState([])
    const [selectedCountryName, setSelectedCountryName] = useState('')

    useEffect(() => {
        fetch(`http://localhost:9292/travelers/${selectedCountry}`)
            .then((r) => r.json())
            .then((travelers) => {
                setTravelersInCountry(travelers)
                console.log("Getting travelers in country")
                console.log(travelersInCountry)
            })
        fetch(`http://localhost:9292/findcountryname/${selectedCountry}`)
            .then(r => r.json())
            .then(country => setSelectedCountryName(country.country_name))
    }, [selectedCountry])

    function handleClick(id) {
        console.log("traveler clicked")
        console.log('ID of traveler clicked:' + id)
        fetch(`http://localhost:9292/visits/${id}`)
            .then((r) => r.json())
            .then((visits) => {
                console.log(visits)
                setVistsOfSelectedTraveler(visits)
            })
        
    }




    


    return(
        <div>
            <Container>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                    <ListGroup>
                        {travelersInCountry.map((traveler => {
                            return <ListGroup.Item 
                                onClick={() => handleClick(traveler.id)} 
                                // key={traveler.id}
                                href={traveler.id}
                                
                                    >{traveler.traveler_name}</ListGroup.Item>
                        }))}
                    </ListGroup>
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        {travelersInCountry.map(traveler => {
                            return <Tab.Pane eventKey={traveler.id}>
                                Vists in {selectedCountryName}
                                {/* {<ul>
                                    {visitsOfSelectedTravler.map(visit => {
                                        return <li>{visit.accomodation_type}
                                                    <ul>
                                                        <li>{visit.accomodation_name}</li>
                                                        <li>{visit.address}</li> 
                                                        <li>Somehow to get country name</li>
                                                    </ul> 
                                                </li>
                                    })} */}
                                <ul>
                                    {visitsOfSelectedTravler.filter(visit => visit.country_id === selectedCountry).map(visit => {
                                        return <li>{visit.accomodation_type}
                                        <ul>
                                            <li>{visit.accomodation_name}</li>
                                            <li>{visit.address}, {selectedCountryName}</li> 
                                        </ul> 
                                    </li>
                                    })
                                    }
                                </ul>
                            </Tab.Pane>
                        })}
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </Container>

        </div>
    )
}

export default TravelersInfo