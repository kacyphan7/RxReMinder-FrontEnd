'use client';

import { useEffect, useState, useCallback } from 'react';

import Link from 'next/link';

export default function MedicationSearch({formData, setFormData}) {
    const [error, setError] = useState(false);
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(false);
    const [medicationsLoading, setMedicationsLoading] = useState(true);
    const [medicationsList, setMedicationsList] = useState([]);
    const [medications, setMedications] = useState();
    
    const updateMedicationOptions = useCallback((newQuery) => {
        if (newQuery) {
            if (medicationsLoading) {
                return setMedicationsList(['Loading...']);
            }
            const results = medications.filter(medication => {
                if (newQuery === '') return true;
                return medication.name.toLowerCase().includes(newQuery.toLowerCase());
            });
            
            setMedicationsList(results);
        }
    }, [medications, medicationsLoading]);
    
    const renderMedications = () => {
        let rows = [];
        for (let i = 0; i < 6 && i < medicationsList.length; i++) {
            let medId = medicationsList[i]._id;
            rows.push(<li key={medId} onClick={() => handleMedId(medicationsList[i])}>{medicationsList[i].name}</li>);
        }
        return rows;
    }
    
    const handleMedId = (medication) => {
        setFormData({ ...formData, medId: medication });
        setQuery(medication.name);
        setSelected(true);
    }

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        updateMedicationOptions(newQuery);
    }
    
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/medications`)
            .then((res) => res.json())
            .then((result) => {
                setMedications(result.medications);
                setMedicationsLoading(false);
            })
            .catch((err) => {
                setError(true);
            });
    }, []);

    useEffect(() => {
        if (formData.medId) {
            setQuery(formData['medId'].name);
            setSelected(true);
        }
    }, []);

    useEffect(() => {
        updateMedicationOptions(query);
    }, [query, updateMedicationOptions]);
    
    if (error) {
        return (
            <>
                <h1>Error</h1>
                <Link href="/prescriptions/new">Try Again</Link>
            </>
        );
    }
    
    return (
        <>
            <input type="text" className="input" placeholder="Search for a medication" value={query} onChange={handleChange} onClick={() => {
                setQuery('');
                setSelected(false);
            }} />
            <ul>
                {(query === '' ? '' : medicationsList[0] === 'Loading...' ? <li key='loading'>Medications Loading...</li> : selected ? '' : renderMedications())}
                {((query === '' || selected) ? '' : <li key='new'><Link href="/medications/new">Create new medication...</Link></li>)}
            </ul>
        </>
    );
}