'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SinglePrescription({ prescriptionId }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/prescriptions/${prescriptionId}`)
        .then(response => {
            setData(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [prescriptionId]);

    if(!data) return <p>Loading...</p>;

    return (
        <div className="container">  
            <h1>Prescription</h1>
            <div className="columns">
                <div className="column">
                    <h2>Medication: {data.prescription.medication.name}</h2>
                    <h2>Category: {data.prescription.medication.category}</h2>
                    <h2>Directions: {data.prescription.medication.directions}</h2>
                    <h2>Dosage: {data.prescription.quantity}</h2>
                    <h2>Frequency: {data.freq}</h2>
                    <h2>Start Date: {data.startDate}</h2>
                    <h2>End Date: {data.endDate}</h2>
                    <h2>Notes: {data.prescription.notes}</h2>
                    <button className="button" onClick={handleDelete}>Delete Prescription</button>
                </div>
            </div>
        </div>
    );
}