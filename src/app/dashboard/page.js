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

import 'src/app/css/logged-in.css';

function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showMedicationWidget, setShowMedicationWidget] = useState(null);
    const [refreshPercentage, setRefreshPercentage] = useState(false);
    const [showDayDoses, setShowDayDoses] = useState(null);
    const [showCustomCalendar, setShowCustomCalendar] = useState(null);

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
        // setShowMedicationWidget(false);
        // setShowDayDoses(false);
        // setShowCustomCalendar(false);

        const timerMedicationWidget = setTimeout(() => {
            setShowMedicationWidget(true);
        }, 250);

        const timerDayDoses = setTimeout(() => {
            setShowDayDoses(true);
        }, 500);

        const timerCustomCalendar = setTimeout(() => {
            setShowCustomCalendar(true);
        }, 750);

        return () => {
            clearTimeout(timerMedicationWidget);
            clearTimeout(timerDayDoses);
            clearTimeout(timerCustomCalendar);
        };
    }, [router]);

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>Not authorized</div>;

    return (
        <Layout className="animate__animated animate__fadeInLeft">
            <div className={`${styles.dashboardGrid}`}>
                <div className={`${styles.mainContent}`}>
                    <div className="level animate__animated animate__fadeInDown">
                        <div className="level-left">
                            <h1 className={`${styles.whiteText} title is-2`}>Hello, {user.firstName}!</h1>
                        </div>
                    </div>
                    <div className={`${styles.customCard} animate__animated ${showCustomCalendar ? 'animate__fadeIn' : ''}`} style={showCustomCalendar === null ? { opacity: 0, visibility: 'hidden' } : {}}>
                        <CustomCalendar className={styles.calendarComponent} />
                    </div>

                    <div className={`${styles.nestedGrid}`}>
                        <div className={`${styles.widget}`}>
                            <div className={`${styles.customCard} card ${showMedicationWidget === true ? 'animate__animated animate__fadeInUp' : showMedicationWidget === false ? 'invisibleCard' : ''}`} style={showMedicationWidget === null ? { opacity: 0, visibility: 'hidden' } : {}}>
                                <div className="card-content">
                                    <p>My Medications:</p>
                                    <br />
                                    <MedicationsWidget />
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.percentage}`}>
                            <div className={`${styles.customCard} card animate__animated animate__fadeInUp delayed-animation-1s`}>
                                <div className="card-content">
                                    <DailyPercentage shouldRefresh={refreshPercentage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.rightSidebar}`}>
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
                    <div className={`${styles.customCard} card ${showDayDoses === true ? 'animate__animated animate__fadeInRight' : ''}`} style={showDayDoses === null ? { opacity: 0, visibility: 'hidden' } : {}}>
                        <div className="card-content">
                            <DayDoses onDoseTaken={setRefreshPercentage} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}

export default Dashboard;




