'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.css';
import { useRouter } from 'next/navigation';


function AllPrescriptions() {
    const [prescriptions, setPrescriptions] = useState([]);
    const router = useRouter();

    if (typeof window !== 'undefined') {
        const expiration = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime > expiration) {
            handleLogout();
            router.push('/');
        }
    }

    useEffect(() => {
        async function fetchPrescriptions() {
            try {
                const response = await axios.get('http://localhost:8000/prescriptions/user', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
                    }
                });

                setPrescriptions(response.data);
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        }

        fetchPrescriptions();
    }, []);

    return (
        <div className="all-prescriptions">
            {prescriptions.map(prescription => (
                <div key={prescription.prescription._id} className="card">
                    <div className="card-content">
                        <p className="title">{prescription.prescription.medication.name}</p>
                        <p className="subtitle">{prescription.prescription.medication.category}</p>
                        <div>
                            <p><strong>Frequency:</strong> {prescription.freq}</p>
                            <p><strong>Start Date:</strong> {prescription.startDate}</p>
                            <p><strong>End Date:</strong> {prescription.endDate}</p>
                            <p><strong>Time 1:</strong> {prescription.time1}</p>
                            {prescription.freq === 'twice' && <p><strong>Time 2:</strong> {prescription.time2}</p>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllPrescriptions;
