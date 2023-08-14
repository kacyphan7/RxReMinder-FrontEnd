"use client";

import React from 'react';
import AllMedications from '../components/allmedications/AllMedications';
import Layout from '../components/sidebar/SideBar';
import { useRouter } from 'next/navigation';



const MedicationsPage = () => {
    return (

        <Layout>
            <div>
                <h1>My Medications</h1>
                <AllMedications />
            </div>
        </Layout>
    );
}

export default MedicationsPage;
