"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import { Chart } from 'chart.js/auto';
import handleLogout from '@/app/utils/handleLogout';
import styles from 'src/app/css/daily-percentage.module.css';


const DailyPercentage = ({ shouldRefresh }) => {
    const router = useRouter();
    const [percentage, setPercentage] = useState(0);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);

    if (typeof window !== 'undefined') {
        const expiration = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime > expiration) {
            handleLogout();
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
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses/dailypercentage`)
            .then(response => {
                if (response.data !== null) {
                    setPercentage(response.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the percentage data: ", error);
                setLoading(false);
            });
    }, [user, shouldRefresh]);



    useEffect(() => {
        if (!loading) {
            let ctx = document.getElementById('doughnut-chart').getContext('2d');
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            let gradient = ctx.createLinearGradient(0, 0, 0, 250);
            gradient.addColorStop(0, '#5A59D3');
            gradient.addColorStop(0.32, '#9B04DB');
            gradient.addColorStop(0.48, '#E200A3');
            gradient.addColorStop(0.64, '#FF1C6A');
            gradient.addColorStop(0.82, '#FF8103');
            gradient.addColorStop(1, '#FBDD49');
            const doughnutLabel = {
                id: "doughnutLabel",
                beforeDatasetsDraw(chart, args, pluginOptions) {
                    const { ctx, data } = chart;
                    ctx.save();
                    const xCoor = chart.getDatasetMeta(0).data[0].x;
                    const yCoor = chart.getDatasetMeta(0).data[0].y;
                    ctx.font = '35px sans-serif';
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'bottom'
                    ctx.fillText(` ${percentage}%`, xCoor, yCoor);

                    ctx.font = '25px sans-serif';
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillText("Complete", xCoor, yCoor + 20);

                }

            }
            chartRef.current = new Chart(ctx, {
                type: 'doughnut',
                plugins: [doughnutLabel],
                data: {
                    labels: ['Doses Taken', 'Remaining'],
                    datasets: [{
                        data: [percentage, 100 - percentage],
                        label: ' Percentage',
                        backgroundColor: [gradient, '#f9f9f9'],
                        borderColor: [gradient, '#f9f9f9'],
                        hoverBackgroundColor: [gradient, gradient],
                        hoverBorderColor: [gradient, gradient],
                        borderAlign: 'inner',
                        hoverOffset: 15,
                        hoverBorderWidth: 15,
                        borderWidth: 7,
                        circumference: 270,
                        rotation: 225,
                        cutout: '70%',
                        radius: '85%',
                    }]
                },
            });
        }
    }, [loading, percentage]);

    return (
        <>
            <h1 className="w-[150px] mx-auto mt-10 has-text-centered text-xl font-semibold capitalize"><strong>Daily Progress</strong></h1>
            <div className={styles.canvasContainer}>
                <div className='border border-gray-400 pt-0 rounded-xl w-full h-full my-auto shadow-xl'>
                    <canvas id='doughnut-chart' className={`${styles.chartCanvas} h-full`}></canvas>
                </div>
            </div>
        </>
    );

};

export default DailyPercentage;
