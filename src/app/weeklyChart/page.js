'use client';

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import { handleLogout } from "../utils/handleLogout";

function weeklyChart() {

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [percentage, setPercentage] = useState(null);
    const chartRef = useRef(null);  

    if (typeof window !== 'undefined') {
        const expiration = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime > expiration) {
            handleLogout();
            router.push('/');
        }
    }

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const sunWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const monWeek = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"];
    const tuesWeek = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
    const wedWeek = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
    const thurWeek = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    const friWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const satWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const today = new Date().getDay();
    let weekLabel;

    switch (daysOfWeek[today]) {
        case "Sunday": weekLabel = sunWeek; break;
        case "Monday": weekLabel = monWeek; break;
        case "Tuesday": weekLabel = tuesWeek; break;
        case "Wednesday": weekLabel = wedWeek; break;
        case "Thursday": weekLabel = thurWeek; break;
        case "Friday": weekLabel = friWeek; break;
        case "Saturday": weekLabel = satWeek; break;
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                .then((response) => {
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setUser(response.data.users[0]);
                    } else {
                        router.push('/');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            router.push('/');
        }
    }, [router]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses/weeklypercentages`)
            .then(response => {
                setPercentage(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [user]);

    useEffect(() => {
        if (percentage) {
            let ctx = document.getElementById('myChart').getContext('2d');
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            percentage.forEach((item) => {
                item = item + '%'
            });

            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: weekLabel,
                    datasets: [{
                        data: percentage,
                        label: "percentages",
                        borderColor: "rgb(109, 253, 181)",
                        backgroundColor: "rgb(109, 253, 181,0.5)",
                        borderWidth: 2
                    }]
                },
            });
        }
    }, [percentage, weekLabel]);

    return (
        <>
            <h1 className="w-[150px] mx-auto mt-10 text-xl font-semibold capitalize">Bar Chart</h1>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        </>
    );
}

export default weeklyChart;
