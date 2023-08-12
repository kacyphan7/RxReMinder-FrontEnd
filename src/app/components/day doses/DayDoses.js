"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import { handleLogout } from '@/app/utils/handleLogout';
import axios from 'axios';

import 'bulma/css/bulma.css';

export default function DayDoses() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [dosesForToday, setDosesForToday] = useState([]);

    const fetchDosesForToday = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses/daydoses`);
            console.log(response.data);
            setDosesForToday(response.data);

        } catch (error) {
            console.log('Error fetching doses data: ', error);
            if (error.response && (error.response.status === 403 || error.response.status === 500)) {
                console.log("Token might be expired or invalid. Please log in again.");
                router.push('/login');
            }
        }
    };

    if (typeof window !== 'undefined') {
        const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime >= expirationTime) {
            handleLogout();
            router.push('/login');
        }
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                .then((response) => {
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setData(response.data.users[0]);
                        setLoading(false);
                    } else {
                        router.push('/login');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    router.push('/login');
                });
        } else {
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        fetchDosesForToday();
    }, []);

    const handleDoseTaken = async (doseId) => {
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses/taken/${doseId}`, { taken: true })
            .then(response => {
                console.log("Dose marked as taken");
                fetchDosesForToday();
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
                        <p className="title is-6">{dose.medication.name}</p>
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