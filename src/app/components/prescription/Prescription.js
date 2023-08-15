'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from 'src/app/css/single-prescription.module.css';



export default function SinglePrescription({ prescriptionId }) {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [freq, setFreq] = useState(null);

    const styleData = {
        marginTop: '100px'
    };

    const handleDelete = () => {
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/prescriptions/${prescriptionId}`)
            .then(response => {
                console.log(response);
                router.push('/dashboard');
            })
            .catch(err => {
                console.log(err);
            });
    };

    const parseFreq = (freq) => {
        if (freq === 'once') {
            return 'Daily';
        } else if (freq === 'twice') {
            return 'Weekly';
        } else if (freq === 'alternate') {
            return 'Every Other Day';
        } else if (freq === 'weekly') {
            return 'Weekly';
        }
    };

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/prescriptions/${prescriptionId}`)
            .then(response => {
                setData(response.data);
                setFreq(parseFreq(response.data.freq));
            })
            .catch(err => {
                console.log(err);
            });
    }, [prescriptionId]);

    if (!data) return <p>Loading...</p>;

    return (
        <>
            <div className={styles.formContainer} >
                <div className="columns is-justify-content-center" style={{ marginBottom: '400px' }}>
                    <div className="column"></div>
                    <div className="card" style={{ ...styleData, backgroundColor: 'rgba(255, 255, 255, 0.7)' }} >
                        <div className="card-content">
                            <span className='icon is-right' style={{ marginLeft: '710px' }}>
                                <a onClick={() => router.push('/prescriptions')}>
                                    <i className="fa-solid fa-person-walking-arrow-loop-left fa-xl"></i>Cancel
                                </a>
                            </span>
                            <h1 className='title has-text-centered'>Your Prescription</h1>
                            <hr aria-hidden='true' />
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-96x96">
                                        <img src="https://media.istockphoto.com/id/1028691062/vector/pharmacy-and-medicine-line-icon-on-gray-background.jpg?s=612x612&w=0&k=20&c=ibXT5DPEbKXWAVltGkW1xiItsdqV_3Js7yWyLFK6GTA=" alt="Placeholder image" />
                                    </figure>
                                </div>
                                <div className="media-content has-text-centered" style={{ marginRight: '100px' }}>
                                    <p className="title is-4">Medication: {data.prescription.medication.name}</p>
                                    <p className="title is-6">Category: {data.prescription.medication.category}</p>
                                    <hr aria-hidden='true' />
                                </div>
                            </div>

                            <div className="content">
                                <p>Frequency: {freq}</p>
                                <p>Dosage: {data.prescription.quantity}</p>
                                <p>Directions: {data.prescription.medication.directions}</p>
                                <br aria-hidden='true' />
                                <hr aria-hidden='true' />
                                <p>Dose Time: {data.time1}</p>
                                {data.time2 ? <p>Second Dose Time: {data.time2}</p> : null}
                                <p>Start Date: {data.startDate}</p>
                                <p>End Date: {data.endDate}</p>
                                <hr aria-hidden='true' />
                                <p>Notes: {data.prescription.notes}</p>
                                <br aria-hidden='true' />
                                <hr aria-hidden='true' />
                                <span className="centered-icon">
                                    <a onClick={() => { handleDelete(); }}>
                                        <i className="fa-solid fa-trash fa-2xl"></i>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="column"></div>
                </div>
            </div>

        </>
    );
}