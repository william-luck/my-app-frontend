import {React, useEffect } from "react";
import { Container } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';



function CountryList({countries, setSelectedCountry, setDeleteAlert, setUpdatedVisitor, badgeArray}) {

    function handleClick(id) {
        setSelectedCountry(id)
        setDeleteAlert(null)
        setUpdatedVisitor(false)
    }

    return(
        
        <div style={{maxHeight: '300px', overflowY: 'scroll'}}>
        <Container>
             <ListGroup>
            
            {countries.length !== 0 ? 
                countries.map((country, index) => {
                    return <ListGroup.Item action onClick={() => handleClick(country.id)} key={country.id} >
                        {country.country_name}&nbsp;&nbsp;
                        <Badge>{badgeArray[index]}</Badge>
                        </ListGroup.Item>
                })
                : null}
            </ListGroup>

        </Container>
        </div>
    )

}

export default CountryList;
