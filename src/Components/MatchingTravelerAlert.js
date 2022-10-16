import React from "react";
import { Alert } from "react-bootstrap";

function matchingTravelerAlert({ matchingTraveler }) {

    return (
        <>
        <Alert variant="warning">
            <Alert.Heading>Matching Traveler: {matchingTraveler.name}</Alert.Heading>
            <p></p>
            <p>{matchingTraveler.name} is curently in {matchingTraveler.current_country}.</p>
            <p>Adding a new visit for {matchingTraveler.name} will move this traveler to the country of the new visit.</p>
        </Alert>
        </>
    )
}

export default matchingTravelerAlert;