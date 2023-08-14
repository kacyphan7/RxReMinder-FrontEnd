"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import 'bulma/css/bulma.css';
import styles from 'src/app/css/all-prescriptions.module.css'

export default function AllPrescriptions({ user }) {
    const [prescriptions, setPrescriptions] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchPrescriptions() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/prescriptions/user`);
                setPrescriptions(response.data);
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        }

        fetchPrescriptions();
    }, []);

    const renderCard = (prescription) => (
        <div key={prescription.prescription._id} className={styles.card}>
            <div className="card-content">
                <p className="title">{prescription.prescription.medication.name}</p>
                <p className="subtitle">{prescription.prescription.medication.category}</p>
            </div>

            <div className={styles["date-container"]}>
                <p><strong>Start Date:</strong> {prescription.startDate}</p>
                <p><strong>End Date:</strong> {prescription.endDate}</p>
            </div>

            <br />
            <div className={styles["more-info"]}>
                <p><strong>Quantity:</strong> {prescription.quantity}</p>
                <br />
                <p><strong>Directions:</strong> {prescription.directions}</p>
                <br />
                <p><strong>Notes:</strong> {prescription.notes}</p>
                <br />
                <div className={styles["button-container"]}>
                    <button className={styles["info-button"]}>See More Info</button>
                    <button className={styles["delete-button"]}>Delete Prescription</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.backgroundWrapper}>
            <div className={styles.column}>
                {prescriptions.filter((_, idx) => idx % 3 === 0).map(renderCard)}
            </div>
            <div className={styles.column}>
                {prescriptions.filter((_, idx) => idx % 3 === 1).map(renderCard)}
            </div>
            <div className={styles.column}>
                {prescriptions.filter((_, idx) => idx % 3 === 2).map(renderCard)}
            </div>
        </div>
    );
}
