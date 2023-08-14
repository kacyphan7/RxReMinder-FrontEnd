'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SinglePrescription({ prescriptionId }) {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [freq, setFreq] = useState(null);

    const handleDelete = () => {
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/prescriptions/${prescriptionId}`)
            .then(response => {
                console.log(response);
                router.push('/dashboard');
            })
            .catch(err => {
                console.log(err);
            });
    };
    const parseFreq = (freq) => {
        if (freq === 'once') {
            return 'Daily';
        } else if (freq === 'twice') {
            return 'Weekly';
        } else if (freq === 'alternate') {
            return 'Every Other Day';
        } else if (freq === 'weekly') {
            return 'Weekly';
        }
    };


    if (typeof window !== 'undefined') {
        const expiration = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime > expiration) {
            handleLogout();
            router.push('/');
        }
    }

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/prescriptions/${prescriptionId}`)
            .then(response => {
                setData(response.data);
                setFreq(parseFreq(response.data.freq));
            })
            .catch(err => {
                console.log(err);
            });
    }, [prescriptionId]);

    if (!data) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>Prescription</h1>
            <div className="columns">
                <div className="column">
                    <h2>Medication: {data.prescription.medication.name}</h2>
                    <h2>Category: {data.prescription.medication.category}</h2>
                    <h2>Directions: {data.prescription.medication.directions}</h2>
                    <h2>Dosage: {data.prescription.quantity}</h2>
                    <h2>Frequency: {freq}</h2>
                    <h2>Dose Time: {data.time1}</h2>
                    {data.time2 ? <h2>Second Dose Time: {data.time2}</h2> : null}
                    <h2>Start Date: {data.startDate}</h2>
                    <h2>End Date: {data.endDate}</h2>
                    <h2>Notes: {data.prescription.notes}</h2>
                    <button className="button" onClick={handleDelete}>Delete Prescription</button>
                </div>
            </div>
        </div>
    );
}