"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';

import styles from "src/app/css/calendar.module.css";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CustomCalendar() {
    const router = useRouter();

    // State
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [dosesList, setDosesList] = useState([]);

    const today = new Date();
    const currentDay = today.getDate();

    // Helper to check for doses
    const isDoseForDay = (day) => {
        return dosesList[day];
    };

    // Authentication logic
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
            if (Date.now() >= expirationTime) {
                handleLogout();
                router.push('/login');
                return;
            }

            setAuthToken(localStorage.getItem('jwtToken'));
            const token = localStorage.getItem('jwtToken');

            if (token) {
                axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                    .then((response) => {
                        const userData = jwtDecode(token);
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
        }
    }, [router]);

    // Fetch doses for the current month
    useEffect(() => {
        const parsedMonth = currentMonth.getMonth() + 1;
        const parsedYear = currentMonth.getFullYear();

        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses/month/${parsedMonth}/${parsedYear}`)
            .then(response => {
                setDosesList(response.data);
            })
            .catch(error => {
                console.log('Error fetching doses data: ', error);
                if (error.response && (error.response.status === 403 || error.response.status === 500)) {
                    console.log("Token might be expired or invalid. Please log in again.");
                    localStorage.removeItem('jwtToken');
                }
            });
    }, [currentMonth]);

    // Change the month based on offset
    const changeMonth = (offset) => {
        setCurrentMonth(prevState => {
            const updatedDate = new Date(prevState);
            updatedDate.setMonth(prevState.getMonth() + offset);
            return updatedDate;
        });
    };

    // Calendar logic
    const startDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    let dates = [...Array(daysInMonth)].map((_, i) => i + 1);
    dates = Array(startDayOfMonth).fill(null).concat(dates);
    const weeks = [];
    while (dates.length) weeks.push(dates.splice(0, 7));

    return (
        <div className={styles.customCalendar}>
            <header className={styles.header}>
                <button className={styles.prevNextButton} onClick={() => changeMonth(-1)}>&lt;</button>
                <h2 className={styles.monthYearHeader}>
                    {currentMonth.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </h2>
                <button className={styles.prevNextButton} onClick={() => changeMonth(1)}>&gt;</button>
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
                                    <div className={
                                        day === currentDay && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()
                                            ? `${styles.day} ${styles.current}`
                                            : styles.day
                                    }>
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
