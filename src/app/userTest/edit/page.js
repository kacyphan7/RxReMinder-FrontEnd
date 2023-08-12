'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import axios from 'axios';
import Link from 'next/link';

export default function UserProfile({ user }) {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.email);
    const [birthdate, setBirthdate] = useState(user?.birthdate);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update user data on the server
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/profile`, {
            firstName,
            lastName,
            email,
            birthdate,
            phoneNumber,
        })
            .then(response => {
                console.log('User data updated successfully.');
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };

    useEffect(() => {
        // Fetch user data from the server
        axios.get(`{process.env.NEXT_PUBLIC_SERVER_URL}/users/profile`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Edit User Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Birthdate:</label>
                <input type="text" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />

                <label>Phone Number:</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}