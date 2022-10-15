import React from "react";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function NewTravelerForm({ countries }) {

    const [formData, setFormData] = useState({
        traveler_name: '',
        passport_number: '',
        nationality: '',
    })

    function handleChange(e) {
    
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        })

        console.log(formData)
    }

    function handleSubmit(e) {
        e.preventDefault()

        fetch ('http://localhost:9292/add_traveler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(createdTraveler => console.log(createdTraveler))
    }
    
    return (
    <>
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
                        {/* <option>Select..</option>
                        <option>Fiction</option>
                        <option>Non-fiction</option>
                        <option>Memoir</option> */}
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