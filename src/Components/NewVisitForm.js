import React from "react";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';

function NewVisitForm({ countries, newTraveler, setNewTraveler }) {

    const [formData, setFormData] = useState({
        passport_number: '',
        accomodation_name: '',
        accomodation_type: 'Hotel',
        address: '',
        city: '',
        country_name: 'Afghanistan',
        cost_per_night: '',
    })

    function handleChange(e) {
        if (e.target.name !== 'cost_per_night') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]: parseInt(e.target.value)
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)

        fetch ('http://localhost:9292/add_visit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(r => r.json())
                .then(createdVisit => console.log(createdVisit))
    }

    function newTravelerAddedAlert() {
        return (
            <Alert variant="warning" dismissible onClose={() => setNewTraveler(false)}>
                <Alert.Heading>New Traveler Added.</Alert.Heading>
                <p>
                Please add a visit for the newly created traveler.
                </p>
            </Alert>
        )
        
    }

    
    
    return (
        <>
            {/* {newTravelerAddedAlert()} */}
            {newTraveler ? newTravelerAddedAlert() : null}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Passport number</Form.Label>
                    <Form.Control placeholder="Who is staying at the accomodation?" onChange={handleChange} value={formData.passport_number} name='passport_number'/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Accomodation name: </Form.Label>
                    <Form.Control placeholder="Enter the name of the accomodation.." onChange={handleChange} value={formData.accomodation_name} name='accomodation_name'/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Accomodation type: </Form.Label>
                    <Form.Select onChange={handleChange} value={formData.accomodation_type} name="accomodation_type">
                        <option>Hotel</option>
                        <option>Hostel</option>
                        <option>AirBnb</option>
                        <option>Homestay</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Address: </Form.Label>
                    <Form.Control placeholder="Ex: 123 Big Bird St." onChange={handleChange} value={formData.address} name='address'/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>City: </Form.Label>
                    <Form.Control placeholder="Ex: 123 Big Bird St." onChange={handleChange} value={formData.city} name='city'/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Select onChange={handleChange} value={formData.country_name} name="country_name">
                        {countries.map(country => {
                            return <option>{country.country_name}</option>
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cost per night: </Form.Label>
                    <Form.Control placeholder="$" onChange={handleChange} value={formData.cost_per_night} name='cost_per_night'/>
                </Form.Group>

                

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </>
    )
}

export default NewVisitForm;