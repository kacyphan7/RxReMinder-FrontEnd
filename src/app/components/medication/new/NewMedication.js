'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from 'src/app/css/new-medication.module.css';

export default function NewMedicationForm() {
    const router = useRouter();
    const [showNotification, setShowNotification] = useState(false);
    const [error, setError] = useState(false);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [directions, setDirections] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleDirections = (e) => {
        setDirections(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        if (typeof window !== 'undefined') {
            const expiration = new Date(localStorage.getItem('expiration') * 1000);
            let currentTime = Date.now();

            if (currentTime > expiration) {
                handleLogout();
                router.push('/');
            }
        }

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/medications/new`, { name, category, directions })
            .then(response => {
                setShowNotification(true); // Show the notification
                setTimeout(() => {
                    setShowNotification(false); // Hide the notification after 2 seconds
                    router.push('/prescriptions/new'); // Redirect to the new prescription page
                }, 2000);
            })
            .catch(error => {
                setError(true);
                // console.log(error);
            });
    };

    return (
        <>
            {error ? <div className="error notification">Medication already exists.</div> : null}

            <div className={styles.medicationContainer}>
                <form onSubmit={handleSubmit} className={styles.medicationForm}>
                    <h1 className={styles.medicationHeading}>Create New Medication</h1>
                    {showNotification && (
                        <div className="notification is-success">Medication created.</div>
                    )}
                    <div className={styles.field}>
                        <div className={styles.control}>
                            <input className={styles.transparentInput} type="text" id="name" name="name" placeholder="Medication Name" value={name} onChange={handleName} required />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.control}>
                            <select className={styles.transparentInput} name="cateogry" id="category" value={category} onChange={handleCategory} required>
                                <option value="" disabled>Select a Category</option>
                                <option value="Antibiotic">Antibiotic</option>
                                <option value="Antidepressant">Antidepressant</option>
                                <option value="Antihistamine">Antihistamine</option>
                                <option value="Antipsychotic">Antipsychotic</option>
                                <option value="Bronchodilator">Bronchodilator</option>
                                <option value="Cholesterol">Cholesterol</option>
                                <option value="Diabetes">Diabetes</option>
                                <option value="Diuretic">Diuretic</option>
                                <option value="Heartburn">Heartburn</option>
                                <option value="Hormone">Hormone</option>
                                <option value="Muscle Relaxant">Muscle Relaxant</option>
                                <option value="Pain Reliever">Pain Reliever</option>
                                <option value="Sleep Aid">Sleep Aid</option>
                                <option value="Stimulant">Stimulant</option>
                                <option value="Vitamin">Vitamin</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.control}>
                            <input className={styles.transparentInput} type="text" id="directions" name="directions" placeholder="Directions" value={directions} onChange={handleDirections} required />
                        </div>
                    </div>
                    <div className={styles.control}>
                        <button className={styles.medicationButton} type="submit">Create</button>
                        <span className='icon is-right'><a onClick={() => router.push('/prescriptions/new')}><i className="fa-solid fa-person-walking-arrow-loop-left fa-xl"></i></a></span>
                    </div>
                </form>
            </div>
        </>
    );
}