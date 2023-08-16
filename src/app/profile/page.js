'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';
import Layout from '@/app/components/sidebar/SideBar';
import Image from 'next/image';
import barGraph from '@/app/assets/barGraph.png';
import fa from '@/app/assets/fontawesome.js';
import brands from '@/app/assets/brands.js';
import solid from '@/app/assets/solid.js';
import BarChart from '@/app/components/barchart/WeeklyChart';

import Link from 'next/link';
import { images } from '../../../next.config';
import 'src/app/css/logged-in.css';

export default function UserProfile() {
    const [showBarChart, setShowBarChart] = useState(null);

    const infoStyle = {
        paddingTop: '50px',
    };

    const cardStyle = {
        marginleft: '10px',
    };

    const textStyle = {
        textAlign: "center",
        fontSize: '30px'
    };

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function formatBirthdate(birthdate) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let date = new Date(birthdate);
        date.setDate(date.getDate() + 1);
        let year = date.getFullYear();
        let month = monthNames[date.getMonth()];
        let day = date.getDate();
        let formattedDate = `${month} ${day}, ${year}`;
        return formattedDate;
    }

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
        // Timers for components
        const timerBarChart = setTimeout(() => {
            setShowBarChart(true);
        }, 1300);

        return () => {
            clearTimeout(timerBarChart);
        };
    }, [router]);

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>Not authorized</div>;

    return (
        <>
            {/* layout to include side bar */}
            <Layout>
                <div className="container">

                    <div className="tile is-justify-content-center is-ancestor">
                        <div style={infoStyle} className="tile is-parent is-justify-content-center">
                            <div className="tile is-11 is-child box animate__animated animate__fadeInDown">
                                <div className="columns">
                                    <div className="column"></div>
                                    <div style={textStyle} className="column">
                                        <h1>{user.firstName} {user.lastName}</h1>
                                        <hr />
                                    </div>
                                    <div className="column"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tile is-justify-content-space-between is-ancestor">
                        <div className="tile is-justify-content-center is-parent ">
                            <div className="tile is-4 is-child box animate__animated animate__fadeIn">
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image is-4by3">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAKkc75rQaHcPgt-NluetIkn0mA8Xyos716A&usqp=CAU" alt="Placeholder image" />
                                        </figure>
                                    </div>
                                    <div className="card-content">
                                        <div className="content">
                                            <span><i className='fa-solid fa-user'></i> <strong>Birthdate</strong>  - {formatBirthdate(user.birthdate)}</span>
                                            <hr />
                                            <span> <i className='fa-solid fa-phone'></i> <strong>Phone Number</strong>  - {user.phoneNumber}</span>
                                            <hr />
                                            <span><i className='fa-solid fa-envelope'></i> <strong>Email</strong>  - {user.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-narrow">
                            </div>
                            <div className="tile is-7 is-child box animate__animated animate__fadeInRight">
                                <div className={`animate__animated ${showBarChart ? 'animate__fadeIn' : ''}`} style={showBarChart === null ? { opacity: 0, visibility: 'hidden' } : {}}>
                                    <BarChart />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tile is-justify-content-center">
                        <div className="tile is-11 is-child">
                            <div className="columns is-justify-content-center">
                                <div className="column is-one-third animate__animated animate__fadeInUp">
                                    <Link className="button is-info is-rounded is-fullwidth" href="/profile/edit">Edit Profile</Link>
                                </div>
                                <div className="column is-one-third animate__animated animate__fadeInUp">
                                    <Link className="button is-info is-rounded is-fullwidth" href="/prescriptions/new">+ Add New Prescription</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}