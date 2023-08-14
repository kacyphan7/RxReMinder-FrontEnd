'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.css';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import handleLogout from '@/app/utils/handleLogout';
import setAuthToken from '@/app/utils/setAuthToken';

function AllMedications() {
    const [medications, setMedications] = useState([]);
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
        setAuthToken(localStorage.getItem('jwtToken'));

        async function fetchMedications() {
            try {
                const response = await axios.get('http://localhost:8000/medications/user', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
                    }
                });

                setMedications(response.data);
            } catch (error) {
                console.error('Error fetching medications:', error);
            }
        }

        if (localStorage.getItem('jwtToken')) {
            let userData = jwtDecode(localStorage.getItem('jwtToken'));

            if (userData.email === localStorage.getItem('email')) {
                fetchMedications();
            } else {
                router.push('/');
            }
        } else {
            router.push('/');
        }

    }, [router]);

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
