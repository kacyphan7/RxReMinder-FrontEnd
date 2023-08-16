"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import 'bulma/css/bulma.css';
import styles from 'src/app/css/all-prescriptions.module.css'

export default function AllPrescriptions({ user }) {
    const router = useRouter();
    const [prescriptions, setPrescriptions] = useState([]);
    const [scripRedirect, setScripRedirect] = useState(null);

    async function fetchPrescriptions() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/prescriptions/user`);
            setPrescriptions(response.data);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
        }
    }

    const handleDelete = (prescriptionId) => {
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/prescriptions/${prescriptionId}`)
            .then(response => {
                console.log(response);
                fetchPrescriptions();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const renderCard = (prescription, idx) => (
        <div
            key={prescription.prescription._id}
            className={`${styles.card} animate__animated animate__fadeInUp`}
            style={{ animationDelay: `${0.1 * idx}s` }}
        >
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
                <p><strong>Quantity:</strong> {prescription.prescription.quantity}</p>
                <br />
                <p><strong>Directions:</strong> {prescription.prescription.medication.directions}</p>
                <br />
                <p><strong>Notes:</strong> {prescription.prescription.notes}</p>
                <br />
                <div className={styles["button-container"]}>
                    <button className={styles["info-button"]} onClick={() => { setScripRedirect(prescription.prescription._id) }}>See More Info</button>
                    <button className={styles["delete-button"]} onClick={() => { handleDelete(prescription.prescription._id) }}>Delete Prescription</button>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    useEffect(() => {
        if (scripRedirect) {
            localStorage.setItem('prescriptionId', JSON.stringify(scripRedirect));
            router.push('/prescriptions/single');
        }
    }, [scripRedirect]);

    return (
        <div className={styles.backgroundWrapper}>
            <div className={styles.column}>
                {prescriptions.filter((_, idx) => idx % 3 === 0).map((prescription, idx) => renderCard(prescription, idx))}
            </div>
            <div className={styles.column}>
                {prescriptions.filter((_, idx) => idx % 3 === 1).map((prescription, idx) => renderCard(prescription, idx))}
            </div>
            <div className={styles.column}>
                {prescriptions.filter((_, idx) => idx % 3 === 2).map((prescription, idx) => renderCard(prescription, idx))}
            </div>
        </div>
    );
}
