import {React, useState, useEffect} from "react";
import { Container, ListGroupItem } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Alert } from "react-bootstrap";


function CountryList({countries, setSelectedCountry, travelerCountArray, setDeleteAlert }) {

    function handleClick(id) {
        setSelectedCountry(id)
        setDeleteAlert(null)
    }



    return(
        <div style={{maxHeight: '300px', overflowY: 'scroll'}}>
        <Container>
             <ListGroup>
            
            {countries.length !== 0 ? 
                countries.map((country, index) => {
                    console.log(country)
                    // I could create an array as a class method, to find the number of travelers in each country.
                    // Then as I map these, get the number by using the counter variable.
                    return <ListGroup.Item action onClick={() => handleClick(country.id)} key={country.id} >
                        {country.country_name}&nbsp;&nbsp;
                        <Badge>{travelerCountArray[index]}</Badge>
                        </ListGroup.Item>
                })
                : console.log('I am not supposed to populate')}
            </ListGroup>


        </Container>
        </div>
    )

}

export default CountryList;
