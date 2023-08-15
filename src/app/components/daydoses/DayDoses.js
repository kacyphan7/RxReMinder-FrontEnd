"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import 'bulma/css/bulma.css';
import styles from "src/app/css/daydoses.module.css";

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

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return { time: `${hours}:${minutes}`, period: ampm };
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1 className="title is-4">{formatDate(new Date())}</h1>
            <h2 className="subtitle is-5">Medications to take today:</h2>

            {dosesForToday.length ? dosesForToday.map(dose => {
                const { time, period } = formatTime(new Date(dose.time));

                return (
                    <div key={dose._id} className="card mb-3">
                        <div className={styles.cardContent}>
                            <div className={styles.checkboxContainer}>
                                <input type="checkbox" onChange={() => handleDoseTaken(dose._id)} />
                                <span className={styles.hoverText}>Mark as taken</span>
                            </div>
                            <p className={styles.medicationName}>
                                <a onClick={() => { handleScripClick(dose.prescription._id) }}>{dose.medication.name}</a>
                            </p>
                            <div className={styles["dose-time-container"]}>
                                <p className={`${styles["dose-time"]} subtitle is-6`}>{`${formatTime(new Date(dose.time)).time} ${formatTime(new Date(dose.time)).period}`}</p>
                            </div>
                        </div>
                    </div>
                );
            }) : <p>No doses to take today.</p>}
        </div>
    );
}

