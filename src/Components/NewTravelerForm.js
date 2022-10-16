import React from "react";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function NewTravelerForm({ countries, setKey, setNewTraveler }) {

    const [formData, setFormData] = useState({
        traveler_name: '',
        passport_number: '',
        nationality: '',
    })
    const [error, setError] = useState(null)

    function handleChange(e) {
    
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        })

        console.log(formData)
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (formData.passport_number.length !== 9) {
            setError(true)
        } else {
            fetch ('http://localhost:9292/add_traveler', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(r => r.json())
                .then(createdTraveler => setNewTraveler(createdTraveler))
                // .then(createdTraveler => setNewTraveler(createdTraveler))

            setKey('add-visit')
            // setNewTraveler(formData.passport_number)

        }   
    }

    function passportError() {
        return (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>
                Please enter a nine-digit passport number.
                </p>
            </Alert>
        )
    }
    
    return (
    <>
        {error ? passportError() : null}
        <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Traveler Name</Form.Label>
                    <Form.Control placeholder="Enter traveler name.." onChange={handleChange} value={formData.traveler_name} name='traveler_name'/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Passport Number:</Form.Label>
                    <Form.Control placeholder="Enter nine-digit passport number.." onChange={handleChange} value={formData.passport_number} name='passport_number'/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Select onChange={handleChange} value={formData.nationality} name="nationality">
                        {countries.map(country => {
                            return <option>{country.country_name}</option>
                        })}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
    </>
    )
}

export default NewTravelerForm;