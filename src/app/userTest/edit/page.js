'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import axios from 'axios';
import Link from 'next/link';
import style from 'src/app/css/profileEdit.module.css';
import Layout from 'src/app/sidebarTest/page.js';

export default function UserProfile({ user }) {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update user data on the server
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
            firstName,
            lastName,
            email,
            birthdate,
            phoneNumber,
        })
            .then(response => {
                console.log('User data updated successfully.');
                setShowNotification(true); // Show the notification
                setTimeout(() => {
                    setShowNotification(false); // Hide the notification after 2 seconds
                    router.push('/userTest'); // Redirect to the profile page
                }, 3000);
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };

    useEffect(() => {
        // Fetch user data from the server
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            if (typeof window !== 'undefined') {
                axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
                    .then(response => {
                        const userData = response.data; // Assuming response.data contains the user data
                        setFirstName(userData.firstName);
                        setLastName(userData.lastName);
                        setEmail(userData.email);
                        setBirthdate(userData.birthdate);
                        setPhoneNumber(userData.phoneNumber);
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            }
        }
    }, []);

    return (
        <Layout>
            <div className="container">
                <h1 className="title is-3 edit-profile-heading">Edit User Profile</h1>
                {showNotification && (
                    <div className="notification is-success">
                        Changes have been saved. To view changes, go back to the profile.
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">First Name:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Last Name:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Birthdate:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Phone Number:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary" type="submit">Save Changes</button>
                            <button
                                className="button is-primary"
                                style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }}
                                onClick={() => router.push('/userTest')}
                            >
                                Cancel Changes
                            </button>
                        </div>
                    </div>

                </form>
            </div >
        </Layout >
    );
}