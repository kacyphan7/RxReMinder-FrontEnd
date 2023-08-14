'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

function AllMedications() {
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        async function fetchMedications() {
            try {
                const response = await axios.get('http://localhost:8000/medications/user', {
                    // Pass the JWT token if required for authentication
                    headers: {
                        Authorization: 'Bearer ' + YOUR_JWT_TOKEN
                    }
                });

                setMedications(response.data);
            } catch (error) {
                console.error('Error fetching medications:', error);
            }
        }

        fetchMedications();
    }, []);

    return (
        <div className="all-medications">
            {medications.map(medication => (
                <div key={medication._id} className="card">
                    <div className="card-content">
                        <p className="title">{medication.name}</p>
                        <p className="subtitle">{medication.category}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllMedications;
