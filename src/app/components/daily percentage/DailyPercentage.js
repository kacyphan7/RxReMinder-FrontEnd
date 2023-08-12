"use client";

import React, { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

export default function DailyPercentage() {
    // Use the mock data directly for testing.
    const percentage = 75;  // This represents 75%. You can adjust this value to test different percentages.

    /*
    // Commenting out the useState and useEffect parts related to fetching data.
    const [percentage, setPercentage] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8000/doses/dailypercentage', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + INSERT_JWT_TOKEN,
                    }
                });
                const data = await response.json();
                setPercentage(data);
            } catch (error) {
                console.error('There was an issue fetching the daily percentage:', error);
            }
        }
        fetchData();
    }, []);
    */

    const data = [
        {
            name: 'Percentage',
            uv: percentage,
            fill: '#8884d8'
        }
    ];

    return (
        <div className="container">
            <RadialBarChart width={300} height={300} innerRadius={60} outerRadius={180} barSize={20} data={data}>
                <RadialBar minAngle={15} maxAngle={360} background clockWise={true} dataKey="uv" />
                <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={{ top: 0, right: 0, lineHeight: '24px' }} />
                <Tooltip />
            </RadialBarChart>
        </div>
    );
}
