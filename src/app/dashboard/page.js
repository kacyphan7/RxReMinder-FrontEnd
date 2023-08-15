"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';
import styles from 'src/app/css/dashboard.module.css';
import Link from 'next/link';
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
                        <div className={styles.customCard}>
                            <CustomCalendar className={styles.calendarComponent} />
                        </div>
                        <br />

                        {/* MedicationsWidget & DailyPercentage side-by-side */}
                        <div className="columns">
                            {/* MedicationsWidget */}
                            <div className="column is-half">
                                <div className={`${styles.customCard} card`}>
                                    <div className="card-content">
                                        <MedicationsWidget />
                                    </div>
                                </div>
                            </div>

                            {/* DailyPercentage */}
                            <div className="column is-half">
                                <div className={`${styles.customCard} card`}>
                                    <div className="card-content">
                                        <DailyPercentage shouldRefresh={refreshPercentage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (1/3) */}
                    <div className={`${styles.marginLeft} column is-one-third`}>
                        {/* Profile Image */}
                        <div className="level">
                            <div className="level-right">
                                <figure className="image is-48x48">
                                    <Link href="/profile">
                                        <div className="profile-link">
                                            <img
                                                className="profile-image"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAKkc75rQaHcPgt-NluetIkn0mA8Xyos716A&usqp=CAU"
                                                alt="User's Profile"
                                                style={{
                                                    clipPath: 'circle(50% at 50% 50%)',
                                                    marginLeft: '290px',
                                                }}
                                            />
                                        </div>
                                    </Link>
                                </figure>
                            </div>
                        </div>

                        {/* DayDoses */}
                        <div className={`${styles.customCard} card`}>
                            <div className="card-content">
                                <DayDoses onDoseTaken={setRefreshPercentage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );


}

export default Dashboard;




