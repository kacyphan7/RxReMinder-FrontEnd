'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import Layout from '@/app/components/sidebar/SideBar';

import Form from '@/app/components/prescription/form/Form.js';
import 'src/app/css/logged-in.css';
import styles from 'src/app/css/new-prescription.module.css';

export default function FormTest() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

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

    return (
        <Layout>
            <div className={styles.formContainer}>
                <Form />
            </div>
        </Layout>
    );
}