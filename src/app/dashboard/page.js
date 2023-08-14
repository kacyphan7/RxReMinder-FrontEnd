'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';
import styles from 'src/app/css/dashboard.module.css';

import CustomCalendar from '@/app/components/calendar/Calendar';
import DayDoses from '@/app/components/daydoses/DayDoses';
import Layout from '@/app/components/sidebar/SideBar';
import DailyPercentage from '@/app/components/dailypercentage/DailyPercentage';
import MedicationsWidget from '../components/medicationswidget/MedicationsWidget';

function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [refreshPercentage, setRefreshPercentage] = useState(false);

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
            <div className={`${styles.formContainer} container`}>
                <div className="columns">

                    {/* MAIN CONTENT COLUMN (2/3) */}
                    <div className={`${styles.noSidePadding} column is-two-thirds`}>

                        {/* Greeting */}
                        <div className="level">
                            <div className="level-left">
                                <h1 className={`${styles.whiteText} title is-2`}>Hello, {user.firstName}!</h1>
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="card">
                            <div className="card-content">
                                <CustomCalendar />
                            </div>
                        </div>
                        <br />

                        {/* MedicationsWidget & DailyPercentage side-by-side */}
                        <div className="columns">

                            {/* MedicationsWidget */}
                            <div className="column is-half">
                                <div className="card">
                                    <div className="card-content">
                                        <MedicationsWidget />
                                    </div>
                                </div>
                            </div>

                            {/* DailyPercentage */}
                            <div className="column is-half">
                                <div className="card">
                                    <div className="card-content">
                                        <DailyPercentage shouldRefresh={refreshPercentage} />
                                    </div>
                                </div>
                            </div>

                        </div> {/* end of inner columns */}

                    </div> {/* end of main content column */}

                    {/* RIGHT COLUMN (1/3) */}
                    <div className={`${styles.marginLeft} column is-one-third`}>
                        {/* Profile Image */}
                        <div className="level">
                            <div className="level-right">
                                <figure className="image is-48x48">
                                    <img src="/path-to-user-profile-icon.jpg" alt="User's Profile" />
                                </figure>
                            </div>
                        </div>

                        {/* DayDoses */}
                        <div className="card">
                            <div className="card-content">
                                <DayDoses onDoseTaken={setRefreshPercentage} />
                            </div>
                        </div>

                    </div> {/* end of right column */}

                </div> {/* end of outer columns */}
            </div>
        </Layout>
    );


}

export default Dashboard;





