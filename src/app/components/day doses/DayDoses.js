"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.css';

// Mock data
const mockDoses = [
    {
        _id: "dose1",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-10T07:00:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose2",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId2",
        time: new Date("2023-08-10T12:00:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose3",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-10T12:01:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose4",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-11T09:00:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose5",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-11T12:00:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose6",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-11T14:00:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose7",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-20T14:00:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose8",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-21T14:00:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose9",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-29T14:00:00Z"),
        taken: false,
        notified: false,
    },
];

export default function DayDoses() {
    const [dosesForToday, setDosesForToday] = useState([]);

    useEffect(() => {
        const currentDate = new Date();
        const formattedCurrentDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

        const fetchDosesForToday = async () => {
            // uncomment and adjust this when the backend is ready
            /*
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.log("No token found. Please log in again.");
                // Redirect or handle appropriately
                return;
            }
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses`, { headers: { 'Authorization': `Bearer ${token}` } });
                const userIdFromToken = response.data.userId; // agian assuming JWT payload contains userId
                const todaysDoses = response.data.filter(dose => 
                    dose.user === userIdFromToken &&
                    dose.taken === false &&
                    new Date(dose.time).toISOString().split('T')[0] === formattedCurrentDate
                );
                setDosesForToday(todaysDoses);
            } catch (error) {
                console.log('Error fetching doses data: ', error);
                if (error.response && (error.response.status === 403 || error.response.status === 500)) {
                    console.log("Token might be expired or invalid. Please log in again.");
                    localStorage.removeItem('jwtToken');
                }
            }
            */

            // Mock data logic for development
            const userIdMock = "userId1";
            const todaysMockDoses = mockDoses.filter(dose =>
                dose.user === userIdMock &&
                dose.taken === false &&
                new Date(dose.time).toISOString().split('T')[0] === formattedCurrentDate
            );
            setDosesForToday(todaysMockDoses);
        };

        fetchDosesForToday();
    }, []);

    const handleDoseTaken = (doseId) => {
        // Update the state by filtering out the dose that's taken
        setDosesForToday(prevDoses => prevDoses.filter(dose => dose._id !== doseId));

        // uncomment and adjust when ready on the backend
        /*
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses/${doseId}`, { taken: true }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` } })
            .then(response => {
                console.log("Dose marked as taken");
            })
            .catch(error => {
                console.log('Error updating dose data: ', error);
            });
        */
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("default", { weekday: 'long', month: 'long', day: 'numeric' });
    };

    return (
        <div className="container">
            <h1 className="title is-4">{formatDate(new Date())}</h1>
            <h2 className="subtitle is-5">Medications to take today:</h2>

            {dosesForToday.length === 0 && (
                <div className="notification is-warning">No doses for today.</div>
            )}

            {dosesForToday.map(dose => (
                <div key={dose._id} className="card mb-3">
                    <div className="card-content">
                        <p className="title is-6">{dose.medication}</p>
                        <p className="subtitle is-6">{new Date(dose.time).toLocaleTimeString()}</p>
                        {/* Checkbox to mark the dose as taken */}
                        <label className="checkbox">
                            <input type="checkbox" onChange={() => handleDoseTaken(dose._id)} /> Mark as taken
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
}