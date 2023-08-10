"use client";

import React, { useState, useEffect } from "react";
// import axios from 'axios';
import styles from "src/app/css/calendar.module.css";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Mock doses data
const mockDoses = [
    {
        _id: "dose1",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-10T12:00:00Z"),
        taken: true,
        notified: false,
    },
    {
        _id: "dose2",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-11T12:00:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose3",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-13T12:00:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose4",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-13T14:00:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose5",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-16T14:00:00Z"),
        taken: false,
        notified: false,
    },
    {
        _id: "dose6",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-19T14:00:00Z"),
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
        _id: "dose8",
        user: "userId1",
        prescription: "prescriptionId1",
        medication: "medicationId1",
        time: new Date("2023-08-29T14:00:00Z"),
        taken: false,
        notified: false,
    },
];

export default function CustomCalendar({ doses = [] }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [dosesList, setDosesList] = useState(doses);

    const isDoseForDay = (day, doses, currentMonth) => {
        return doses.some(dose => {
            const doseDate = new Date(dose.time);
            return doseDate.getFullYear() === currentMonth.getFullYear()
                && doseDate.getMonth() === currentMonth.getMonth()
                && doseDate.getDate() === day;
        });
    };

    useEffect(() => {
        // Commenting out the axios call and using mock data for now

        /*
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.log("No token found. Please log in again.");
            // maybe redirect to login page or handle appropriately
            return;
        }

        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
                const userId = response.data.userId; // assuming JWT payload contains userId

                const upcomingDoses = response.data.filter(dose => dose.user === userId && dose.taken === false);

                setDosesList(upcomingDoses);
            })
            .catch(error => {
                console.log('Error fetching doses data: ', error);
                if (error.response && (error.response.status === 403 || error.response.status === 500)) {
                    console.log("Token might be expired or invalid. Please log in again.");
                    localStorage.removeItem('jwtToken');
                }
            });
        */

        // Using mock data until backend is ready
        setDosesList(mockDoses.filter(dose => !dose.taken));

    }, []);

    const changeMonth = (offset) => {
        setCurrentMonth((prevState) => {
            const updatedState = new Date(prevState.valueOf());
            updatedState.setMonth(prevState.getMonth() + offset);
            return updatedState;
        });
    };

    const startDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    ).getDay();

    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate();

    let dates = [...Array(daysInMonth)].map((_, i) => i + 1);
    dates = Array(startDayOfMonth).fill(null).concat(dates);
    const weeks = [];
    while (dates.length) weeks.push(dates.splice(0, 7));

    return (
        <div className={styles.customCalendar}>
            <header className={styles.header}>
                <button className={styles.prevNextButton} onClick={() => changeMonth(-1)}>Prev</button>
                <h2 className={styles.monthYearHeader}>
                    {currentMonth.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </h2>
                <button className={styles.prevNextButton} onClick={() => changeMonth(1)}>Next</button>
            </header>
            <table>
                <thead>
                    <tr>
                        {DAYS_OF_WEEK.map((day, index) => (
                            <th className={styles.dayOfWeek} key={index}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week, index) => (
                        <tr key={index}>
                            {week.map((day, index) => (
                                <td key={day ? `day-${day}` : `empty-${index}`}>
                                    <div className={styles.day}>
                                        <span>
                                            {day}
                                            {isDoseForDay(day, dosesList, currentMonth) && <span className={styles.blueDot}></span>}
                                        </span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
