"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from "@/app/css/medications-widget.module.css";

export default function MedicationsWidget() {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/medications/user`)
            .then(response => {
                setMedications(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("There was an error fetching the medications data: ", err);
                setError(err);
            });
    }, [loading]); // Add user as a dependency

    if (error) return <div>Error: {error.message}</div>;
    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className={styles.maxHeight}>
                {medications.map(medication => (
                    <div key={medication._id} className="card">
                        <div className="card-content has-text-centered">
                            <p className="title is-6">{medication.name}</p>
                            <p className="subtitle is-6">{medication.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}