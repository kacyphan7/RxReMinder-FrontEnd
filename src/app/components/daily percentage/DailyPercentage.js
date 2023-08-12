"use client";

import React, { useEffect } from 'react';
import c3 from 'c3';
import 'c3/c3.css'; // Importing styles for c3

const DailyPercentage = () => {
    useEffect(() => {
        const chart = c3.generate({
            bindto: '#daily-percentage-chart',
            data: {
                columns: [
                    ['Remaining', 100],  // start with 100
                    ['Percentage', 0],  // start with 0
                ],
                type: 'donut',
                order: null,
                colors: {
                    Percentage: '#8884d8',
                    Remaining: '#f4f4f4'
                }
            },
            donut: {
                title: "10%",
                width: 30,
                startingAngle: 1.5 * Math.PI // starts animation from top
            },
            transition: {
                duration: 1500
            }
        });

        // introducing a delay before loading actual data to simulate animation
        setTimeout(() => {
            chart.load({
                columns: [
                    ['Remaining', 90],
                    ['Percentage', 10]
                ]
            });
        }, 100); // delay of 100ms

        // cleanup on unmount
        return () => {
            chart.destroy();
        };
    }, []);

    return (
        <div id="daily-percentage-chart"></div>
    );
}

export default DailyPercentage;
