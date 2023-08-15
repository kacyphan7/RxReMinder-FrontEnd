"use client";

import React, { useEffect, useState } from 'react';
import AllPrescriptions from '../components/allmedications/AllPrescriptions';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import Layout from '../components/sidebar/SideBar';
import styles from 'src/app/css/manage-all-prescriptions.module.css';
import 'src/app/css/logged-in.css';

const MedicationsPage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    if (typeof window !== 'undefined') {
        const expiration = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime > expiration) {
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
                        setUser(response.data.users[0]);
                        setIsLoading(false);
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

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>Not authorized</div>;

    return (
        <Layout>
            <div className={styles.contentWrapper}>
                <div className={styles.titleContainer}>
                    <h1 className={`${styles.whiteText} title is-2`}>My Prescriptions</h1>
                </div>
                <AllPrescriptions user={user} />
            </div>

        </Layout>
    );
}

export default MedicationsPage;
