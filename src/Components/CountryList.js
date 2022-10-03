import {React, useState, useEffect} from "react";
import { Container, ListGroupItem } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';


function CountryList({countries}) {

    

    if (countries.length !== 0) {
        console.log('I am no longer empty')
        console.log(countries[0])
    } else {
        
    }


    const testCountries = ['Africa', 'thats not a country', 'sweet home alabama']

    
    
    

    return(
        <div style={{maxHeight: '300px', overflowY: 'scroll'}}>
        <Container>
             <ListGroup>
             {/* <ListGroup.Item>suhhhhhh dude</ListGroup.Item>
             <ListGroup.Item>suhhhhhh dude</ListGroup.Item>
             <ListGroup.Item>suhhhhhh dude</ListGroup.Item> */}

            {countries.length !== 0 ? 
                countries.map(country => {
                    return <ListGroup.Item>{country.country_name}</ListGroup.Item>
                })
                : console.log('I am not supposed to populate')}

                
            

                

                

             {/* {booksToDisplay.map(book => (
                <Col>
                <Card>
                    <BookCard key={book.id} book={book} ratingToggle={ratingToggle} bookReading={bookReading} newPageUpdate={newPageUpdate}/>
                </Card>
                </Col>
            ))} */}
                {/* <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
            </ListGroup>
        </Container>
        </div>
    )

}

export default CountryList;
