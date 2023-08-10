'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import setAuthToken from '@/app/utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import Link from 'next/link';

export default function Login() {
    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, { email, password })
            .then(response => {
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('email', response.data.userData.email);
                localStorage.setItem('expiration', response.data.userData.exp);
                setAuthToken(response.data.token);
                let decoded = jwtDecode(response.data.token);
                setRedirect(true);
            })
            .catch(error => {
                setError(true);
                console.log(error);
            });

    };
    
    if (redirect) router.push('/');
    
    if (error) return <p>Incorrect username or password.</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="field">
                <div className="control">
                    <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={handleEmail} required />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={handlePassword} required />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="submit">Login</button>
                </div>
            </div>
            <Link href="/register">Register</Link>
        </form>
    );
}