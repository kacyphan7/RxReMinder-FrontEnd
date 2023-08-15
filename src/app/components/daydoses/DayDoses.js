"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import 'bulma/css/bulma.css';

export default function DayDoses({ onDoseTaken }) {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [scripRedirect, setScripRedirect] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [dosesForToday, setDosesForToday] = useState([]);

    const fetchDosesForToday = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses/daydoses`);
            setDosesForToday(response.data);
            setLoading(false);

        } catch (error) {
            console.log('Error fetching doses data: ', error);
            if (error.response && (error.response.status === 403 || error.response.status === 500)) {
                console.log("Token might be expired or invalid. Please log in again.");
                router.push('/login');
            }
        }
    };

    useEffect(() => {
        fetchDosesForToday();
    }, []);

    useEffect(() => {
        if (scripRedirect) {
            localStorage.setItem('prescriptionId', JSON.stringify(scripRedirect));
            router.push('/prescriptions/single');
        }
    }, [scripRedirect]);

    const handleScripClick = (prescriptionId) => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/prescriptions/${prescriptionId}`)
            .then(response => {
                setScripRedirect(response.data.prescription._id);
            })
            .catch(err => {
                setError(true);
            })
    }
        

    const handleDoseTaken = async (doseId) => {
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses/taken/${doseId}`)
            .then(response => {
                fetchDosesForToday();
                onDoseTaken(prev => !prev); // toggling the refresh trigger

            })
            .catch(error => {
                console.log('Error updating dose data: ', error);
            });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("default", { weekday: 'long', month: 'long', day: 'numeric' });
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1 className="title is-4">{formatDate(new Date())}</h1>
            <h2 className="subtitle is-5">Medications to take today:</h2>

            {dosesForToday.length ? dosesForToday.map(dose => (
                <div key={dose._id} className="card mb-3">
                    <div className="card-content">
                        <p className="title is-6"><a onClick={() => {handleScripClick(dose.prescription._id)}}>{dose.medication.name}</a></p>
                        <p className="subtitle is-6">{new Date(dose.time).toLocaleTimeString()}</p>
                        {/* Checkbox to mark the dose as taken */}
                        <label className="checkbox">
                            <input type="checkbox" onChange={() => handleDoseTaken(dose._id)} /> Mark as taken
                        </label>
                    </div>
                </div>
            )) : <p>No doses to take today.</p>}
        </div>
    );
}