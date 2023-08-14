"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

function AllMedications() {
    const [medications, setMedications] = useState([]);

    useEffect(() => {
    }, []);

    return (
        <div className="medications">
        </div>
    );
}

export default AllMedications;
