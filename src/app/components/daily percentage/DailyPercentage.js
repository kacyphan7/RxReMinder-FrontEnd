"use client";

import React, { useState, useEffect } from 'react';

export default function DailyPercentage() {
    const [percentage, setPercentage] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8000/doses/dailypercentage', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + YOUR_JWT_TOKEN, // Replace YOUR_JWT_TOKEN with your actual token
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

    const mockdata = [
        {
            name: 'Percentage',
            uv: percentage,
            fill: '#8884d8'
        }
    ];

    return (
        <div className="container">
            {percentage !== null && (
                <RadialBarChart width={300} height={300} innerRadius={20} outerRadius={140} barSize={10} data={data}>
                    <RadialBar minAngle={15} background clockWise dataKey="uv" />
                    <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={{ top: 0, right: 0, lineHeight: '24px' }} />
                    <Tooltip />
                </RadialBarChart>
            )}
        </div>
    );
}
