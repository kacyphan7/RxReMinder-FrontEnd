"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "src/app/css/calendar.module.css";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CustomCalendar({ calendarData, tasks = [] }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const isTaskForDay = (day, tasks, currentMonth) => {
        return tasks.some(task => {
            const taskDate = new Date(task.date);
            return taskDate.getFullYear() === currentMonth.getFullYear()
                && taskDate.getMonth() === currentMonth.getMonth()
                && taskDate.getDate() === day;
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.log("No token found. Please log in again.");
            // maybe redirect to login page or handle appropriately
            return;
        }

        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
                const userId = response.data.userId; // assuming JWT payload contains userId

                // filter doses for this user which haven't been taken.
                const upcomingDoses = response.data.filter(dose => dose.user === userId && dose.taken === false);

                setTasks(upcomingDoses);
            })
            .catch(error => {
                console.log('Error fetching doses data: ', error);
                if (error.response && (error.response.status === 403 || error.response.status === 500)) {
                    console.log("Token might be expired or invalid. Please log in again.");
                    // Optionally remove invalid token and/or redirect user to login page
                    localStorage.removeItem('jwtToken');
                }
            });
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
                                            {isTaskForDay(day, tasks, currentMonth) && <span className={styles.blueDot}></span>}
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
