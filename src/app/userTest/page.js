'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';

import Link from 'next/link';

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
                    setUser(response.data.users[0]);
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
                                <span><i></i> <p>{user.firstName} {user.lastName}</p></span>
                                <span></span>
                            </div>
                            <div className="column">
                                <span>UserName</span>
                            </div>
                            <div className="column">
                                <span>{user.phoneNumber}</span>
                                <br />
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tile is-ancestor">
                <div className="tile is-parent">
                    <div className="tile is-3 is-child box">
                        <ul>
                            <li>Birthdate - {user.birthdate}</li>
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
                            <Link className="button is-info is-rounded is-fullwidth" href="/user/edit">Edit User</Link>
                        </div>
                        <div className="column">
                            <Link className="button is-info is-rounded is-fullwidth" href="/prescription/add">+ Add New Prescription</Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}