import {React } from "react";
import { Container } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';



function CountryList({countries, setSelectedCountry, travelerCountArray, setDeleteAlert, setUpdatedVisitor }) {

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
                        <Badge>{country.travelers_currently_in_country.length}</Badge>
                        </ListGroup.Item>
                })
                : null}
            </ListGroup>

            {/* On deletion or addition, I can get the index of that changed country (id - 1),  */}
            {/* index = countries[1].travelers_currently_in_country.findIndex(traveler => traveler.id === 124) */}
            {/* countries[1].travelers_currently_in_country.splice(index, index) */}
            {/* The above should remove from countries, setCountries then after that..  */}




        </Container>
        </div>
    )

}

export default CountryList;
