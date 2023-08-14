"use client";

import React from 'react';
import AllPrescriptions from '../components/allmedications/AllPrescriptions';
import Layout from '../components/sidebar/SideBar';
import { useRouter } from 'next/navigation';



const MedicationsPage = () => {
    return (

        <Layout>
            <div>
                <h1>My Prescriptions</h1>
                <AllPrescriptions />
            </div>
        </Layout>
    );
}

export default MedicationsPage;
