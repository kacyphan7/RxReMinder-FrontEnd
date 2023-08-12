"use client";

import React, { useState, useEffect } from 'react';

function DailyPercentage() {
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

    // Render the component
    // ...
}
