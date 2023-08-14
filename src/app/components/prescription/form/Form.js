'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Link from 'next/link';

import OneMedication from './1medication/Medication';
import TwoFrequency from './2frequency/Frequency';
import ThreeTime from './3time/Time';
import FourDuration from './4duration/Duration';
import FiveDirections from './5directions/Directions';
import styles from 'src/app/css/new-prescription.module.css';

export default function Form() {
    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(0);
    const [formData, setFormDate] = useState({
        medId: '',
        quantity: '',
        freq: '',
        time1: '',
        time2: '',
        startDate: '',
        endDate: '',
        notes: '',
        timezone: (new Date().getTimezoneOffset()) / 60,
    });

    function setFormData(newFormData) {
        setFormDate({ ...formData, ...newFormData });
    }

    function handleSubmit() {
        if (page === 0) {
            if (formData.medId === '') return alert('Please select a medication.');
            if (formData.quantity === '') return alert('Please enter a quantity.');
        }
        if (page === 1 && formData.freq === '') return alert('Please select a frequency.');
        if (page === 2) {
            if (formData.time1 === '') return alert('Please select a dose time.');
            if (formData.freq === 'two' && formData.time2 === '') return alert('Please select a second dose time.');
        }
        if (page === 3) {
            if (formData.startDate === '') return alert('Please select a start date.');
            if (formData.endDate === '') return alert('Please select an end date.');
        }

        if (page < 4) {
            setPage(page + 1);
        } else {
            submitForm();
        }
    }


    if (typeof window !== 'undefined') {
        const expiration = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime > expiration) {
            handleLogout();
            router.push('/');
        }
    }

    function submitForm() {
        setFormData({ ...formData, medId: formData['medId']._id });
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/prescriptions/new`, formData)
            .then(response => {
                setRedirect(true);
            })
            .catch((err) => {
                setError(true);
            });
    }

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return <OneMedication formData={formData} setFormData={setFormData} />;
            case 1:
                return <TwoFrequency formData={formData} setFormData={setFormData} />;
            case 2:
                return <ThreeTime formData={formData} setFormData={setFormData} />;
            case 3:
                return <FourDuration formData={formData} setFormData={setFormData} />;
            case 4:
                return <FiveDirections formData={formData} setFormData={setFormData} />;
            default:
                return <OneMedication formData={formData} setFormData={setFormData} />;
        }
    };

    if (redirect) router.push('/dashboard');

    return (
        <div className={styles.formContainer}>
            <div className={styles.formCard}>
                <span className='icon is-right' style={{ marginLeft: '720px' }}>
                    <a onClick={() => router.push('/profile')}>
                        <i className="fa-solid fa-person-walking-arrow-loop-left fa-xl"></i>Cancel
                    </a>
                </span>
                <h1>Add Prescription</h1>
                <div className={styles.formSection}>
                    {error ? <p>There was an error submitting your form. Please try again.</p> : null}
                    {conditionalComponent()}
                    {page > 0 && <button className="button" onClick={() => setPage(page - 1)}>Back</button>}
                    <button className="button" onClick={handleSubmit}>{page < 4 ? "Next" : "Submit"}</button>
                </div>
            </div>
        </div>
    );
}