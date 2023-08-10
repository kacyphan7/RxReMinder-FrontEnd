'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwtDecode from 'jwt-decode';
import setAuthToken from 'src/app/utils/setAuthToken.js';
import handleLogout from 'src/app/utils/handleLogout.js';
import axios from "axios";

export default function UserProfile() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    if (typeof window !== 'undefined') {
        const expiration = new Date(localStorage.getItem('expiration') * 1000)
        let currentTime = Date.now();

        if (currentTime > expiration) {
            handleLogout()
                router.push('/');
        }
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
            .then((response) => {
                let userData = jwtDecode(localStorage.getItem('jwtToken'));
                if (userData.email === localStorage.getItem('email')) {
                    setUser(response.data);
                    setIsLoading(false);
                } else {
                    router.push('/');
                }
            })
            .catch((error) => {
                console.log(error);
                router.push('/');
            })
        } else {
            router.push('/');
        }
    }, [router])

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>Not authorized</div>;

    return (
        <>
            {/* layout to include side bar */}
            <div className="container">
            
            <div className="tile is-ancestor">
                <div className="tile is-parent">
                    <div className="tile is-child box">
                        <div className="columns">
                            <div className="column">
                                <span><i></i> <p>First name, Last name</p></span>
                                <span></span>
                            </div>
                            <div className="column">
                                <span>UserName</span>
                            </div>
                            <div className="column">
                                <span>Phone number</span>
                                <br />
                                <span>Email</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tile is-ancestor">
                <div className="tile is-parent">
                    <div className="tile is-3 is-child box">
                        <ul>
                            <li>Age</li>
                            <hr />
                            <li>Weight</li>
                            <hr />
                            <li>Height</li>
                        </ul>

                    </div>
                    <div className="tile is-child box">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                    </div>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <div className="columns">
                        <div className="column">
                            <button className="button is-info is-rounded is-fullwidth">Edit User</button>
                        </div>
                        <div className="column">
                            <button className="button is-info is-rounded is-fullwidth">+ Add New Prescription</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}