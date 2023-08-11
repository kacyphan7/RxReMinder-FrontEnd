'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';

export default function Test() {
    const router = useRouter();
    const [date, setDate] = useState('');
	const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    if (typeof window !== 'undefined') {
        const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime >= expirationTime) {
            handleLogout();
            router.push('/users/login');
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
                        router.push('/users/login');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    router.push('/users/login');
                });
        } else {
            router.push('/users/login');
        }
    }, [router]);

    const handleDate = (e) => {
        setDate(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/prescriptions/new`, { date, timezone: (new Date().getTimezoneOffset()) / 60 })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                setError(true);
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="time" name="date" value={date} onChange={handleDate} />
            <button type="submit">Submit</button>
        </form>
    );
}