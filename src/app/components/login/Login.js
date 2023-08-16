'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import setAuthToken from '@/app/utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import Link from 'next/link';
import styles from 'src/app/css/login.module.css';

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

    if (redirect) router.push('/dashboard');

    return (
        <>
            <div className={styles.loginContainer}>
                {error ? <p className={styles.errorMessage}>Incorrect username or password.</p> : null}
                <form onSubmit={handleSubmit} className={`${styles.loginForm} animate__animated animate__fadeInDown`}>
                    <h1 className={styles.loginHeading}>Login</h1>
                    <div className={styles.field}>
                        <div className={styles.control}>
                            <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={handleEmail} required className={styles.transparentInput} />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.control}>
                            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={handlePassword} required className={styles.transparentInput} />
                        </div>
                    </div>
                    <div className={styles.field}>

                        <button type="submit" className={styles.loginButton}>Login</button>

                    </div>
                    <Link href="/register" className={styles.registerLink}>Register</Link>
                </form>
            </div>
        </>
    );
}