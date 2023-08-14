"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import 'bulma/css/bulma.css';
import styles from 'src/app/css/all-prescriptions.module.css'

export default function AllPrescriptions({ user }) { // accept user as a prop
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

    return (
        <div className={styles["cards-grid"]}>
            {prescriptions.map(prescription => (
                <div key={prescription.prescription._id} className={styles.card}>
                    <div className="card-content">
                        <p className="title">{prescription.prescription.medication.name}</p>
                        <p className="subtitle">{prescription.prescription.medication.category}</p>
                        <div className={styles["date-container"]}>
                            <p><strong>Start Date:</strong> {prescription.startDate}</p>
                            <p><strong>End Date:</strong> {prescription.endDate}</p>
                        </div>

                        {/* Additional Information Container on hover*/}
                        <div className={styles["more-info"]}>
                            <p><strong>Quantity:</strong> {prescription.quantity}</p>
                            <p><strong>Directions:</strong> {prescription.directions}</p>
                            <p><strong>Notes:</strong> {prescription.notes}</p>
                            <button className={styles["info-button"]}>See More Info</button>
                            <button className={styles["delete-button"]}>Delete Prescription</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


}
