"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';

import styles from "src/app/css/calendar.module.css";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Mock doses data
// const mockDoses = [
//     {
//         _id: "dose1",
//         user: "userId1",
//         prescription: "prescriptionId1",
//         medication: "medicationId1",
//         time: new Date("2023-08-10T12:00:00Z"),
//         taken: true,
//         notified: false,
//     },
//     {
//         _id: "dose2",
//         user: "userId1",
//         prescription: "prescriptionId1",
//         medication: "medicationId1",
//         time: new Date("2023-08-11T12:00:00Z"),
//         taken: false,
//         notified: false,
//     },
//     {
//         _id: "dose3",
//         user: "userId1",
//         prescription: "prescriptionId1",
//         medication: "medicationId1",
//         time: new Date("2023-08-13T12:00:00Z"),
//         taken: false,
//         notified: false,
//     },
//     {
//         _id: "dose4",
//         user: "userId1",
//         prescription: "prescriptionId1",
//         medication: "medicationId1",
//         time: new Date("2023-08-13T14:00:00Z"),
//         taken: false,
//         notified: false,
//     },
//     {
//         _id: "dose5",
//         user: "userId1",
//         prescription: "prescriptionId1",
//         medication: "medicationId1",
//         time: new Date("2023-08-16T14:00:00Z"),
//         taken: false,
//         notified: false,
//     },
//     {
//         _id: "dose6",
//         user: "userId1",
//         prescription: "prescriptionId1",
//         medication: "medicationId1",
//         time: new Date("2023-08-19T14:00:00Z"),
//         taken: false,
//         notified: false,
//     },
//     {
//         _id: "dose7",
//         user: "userId1",
//         prescription: "prescriptionId1",
//         medication: "medicationId1",
//         time: new Date("2023-08-20T14:00:00Z"),
//         taken: false,
//         notified: false,
//     },
//     {
//         _id: "dose8",
//         user: "userId1",
//         prescription: "prescriptionId1",
//         medication: "medicationId1",
//         time: new Date("2023-08-21T14:00:00Z"),
//         taken: false,
//         notified: false,
//     },
//     {
//         _id: "dose8",
//         user: "userId1",
//         prescription: "prescriptionId1",
//         medication: "medicationId1",
//         time: new Date("2023-08-29T14:00:00Z"),
//         taken: false,
//         notified: false,
//     },
// ];

export default function CustomCalendar() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [dosesList, setDosesList] = useState([]);

    // const isDoseForDay = (day, doses, currentMonth) => {
    //     console.log(day);
    //     return doses.some(dose => {
    //         const doseDate = new Date(dose.time);
    //         return doseDate.getFullYear() === currentMonth.getFullYear()
    //             && doseDate.getMonth() === currentMonth.getMonth()
    //             && doseDate.getDate() === day;
    //     });
    // };

    const isDoseForDay = (day) => {
        return dosesList[day];
    };

    if (typeof window !== 'undefined') {
        const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime >= expirationTime) {
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
                        setData(response.data.users[0]);
                        setLoading(false);
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

    useEffect(() => {
        if (currentMonth) {
            let parsedMonth = currentMonth.getMonth() + 1;
            let parsedYear = currentMonth.getFullYear();
            // console.log(parsedMonth, parsedYear);
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses/month/${parsedMonth}/${parsedYear}`)
                .then(response => {
                    // console.log(response.data);
                    setDosesList(response.data);
                })
                .catch(error => {
                    console.log('Error fetching doses data: ', error);
                    if (error.response && (error.response.status === 403 || error.response.status === 500)) {
                        console.log("Token might be expired or invalid. Please log in again.");
                        localStorage.removeItem('jwtToken');
                    }
                });
        }
        

        // Using mock data until backend is ready
        // setDosesList(mockDoses.filter(dose => !dose.taken));

    }, [currentMonth]);

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
                                            {isDoseForDay(day) && <span className={styles.blueDot}></span>}
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
