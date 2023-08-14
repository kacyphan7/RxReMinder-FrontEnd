"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';

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
            <div className="container">
                <div className="columns">
                    {/* FIRST COLUMN (Navbar) */}
                    {/* <div className="column is-one-quarter navbar-column">
                        <div className="card full-height">
                            <div className="card-content">
                                {/* <navbar /> */}
                    {/* <div>Placeholder for navbar card</div>
                            </div>
                        </div> */}
                    {/* </div> */}

                    {/* SECOND COLUMN */}
                    <div className="column is-half">
                        <div className="level">
                            {/* user greeting */}
                            <div className="level-left">
                                <h1 className="title is-2">Hello, {user.firstName}!</h1>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content">
                                <CustomCalendar />
                            </div>
                        </div>
                        <br />
                        <div className="columns">
                            {/* First card */}
                            <div className="column">
                                <div className="card">
                                    <div className="card-content">
                                        {/* <div>Placeholder content for first card</div> */}
                                        {/* <MedicationsWidget /> */}
                                    </div>
                                </div>
                            </div>

                            {/* Second card */}
                            <div className="column">
                                <div className="card">
                                    <div className="card-content">
                                        {/* <div>Placeholder content for second card</div> */}
                                        <DailyPercentage shouldRefresh={refreshPercentage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* THIRD COLUMN */}
                    <div className="column is-one-quarter">
                        <div className="level">
                            {/* Spacer for the left side */}
                            <div className="level-left"></div>

                            {/* profile image icon on the right */}
                            <div className="level-right">
                                <figure className="image is-48x48">
                                    <img src="/path-to-user-profile-icon.jpg" alt="User's Profile" />
                                </figure>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content">
                                <DayDoses onDoseTaken={setRefreshPercentage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );
}

export default Dashboard;





