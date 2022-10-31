import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useState } from "react";

function MatchingTravelerAlert({ matchingTraveler }) {

    const [lastCountry, setLastCountry] = useState(['Afghanistan'])

    useEffect(() => {
        setLastCountry(matchingTraveler.countries.slice(-1)[0].country_name)
    }, [matchingTraveler])

    return (
        <>
        <Alert variant="warning">
            <Alert.Heading>Matching Traveler: {matchingTraveler.traveler_name}</Alert.Heading>
            <p></p>
            <p>{matchingTraveler.length !== 0 ? `${matchingTraveler.traveler_name} is curently in ${lastCountry}.`: null}</p>
            <p>Adding a new visit for {matchingTraveler.traveler_name} will move this traveler to the country of the new visit.</p>
        </Alert>
        </>
    )
}

export default MatchingTravelerAlert;