"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';

function MedicationsWidget() {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Handle session expiration logic
    if (typeof window !== 'undefined') {
        const expiration = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime > expiration) {
            handleLogout();
            router.push('/');
        }
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                .then((response) => {
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setUser(response.data.users[0]);
                        setLoading(false);
                    } else {
                        router.push('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    router.push('/');
                });
        } else {
            router.push('/');
        }
    }, [router]);

    useEffect(() => {
        if (user) { // Only fetch medications if the user has been set
            axios.get('http://localhost:8000/prescriptions/user')
                .then(response => {
                    setMedications(response.data);
                })
                .catch(err => {
                    console.error("There was an error fetching the medications data: ", err);
                    setError(err);
                });
        }
    }, [user]); // This effect triggers whenever the user state changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {medications.map(prescription => (
                <div key={prescription._id} className="card">
                    <div className="card-content has-text-centered">
                        <p className="title">{prescription.medication.name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MedicationsWidget;
