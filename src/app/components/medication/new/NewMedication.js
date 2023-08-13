'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Link from 'next/link';

export default function NewMedicationForm() {
    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
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
        
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/medications/new`, { name, category, directions })
            .then(response => {
                setRedirect(true);
            })
            .catch(error => {
                setError(true);
                // console.log(error);
            });
    }

    // if (redirect) router.push('/dashboard');

    return (
        <>
            {error ? <p className="error">Medication already exists.</p> : null}
            <div className="container">
                <h1>Create New Medication</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <input type="text" id="name" name="name" placeholder="Medication Name" value={name} onChange={handleName} required />
                        </div>
                    </div>
                    <div>
                        <div>
                            <select name="cateogry" id="category" value={category} onChange={handleCategory} required>
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
                    <div>
                        <div>
                            <input type="text" id="directions" name="directions" placeholder="Directions" value={directions} onChange={handleDirections} required />
                        </div>
                    </div>
                    <div>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        </>
    );
}