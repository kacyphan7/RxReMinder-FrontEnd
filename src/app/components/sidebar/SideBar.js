'use client';

import { useEffect, useState } from 'react';
import fa from '@/app/assets/fontawesome.js';
import brands from '@/app/assets/brands.js';
import solid from '@/app/assets/solid.js';
import { useRouter } from 'next/navigation';
import handleLogout from "@/app/utils/handleLogout.js";

export default function Layout({ children }) {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // This forces a rerender, so the page is rendered
        // the second time but not the first
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    const styleNav = {
        backgroundColor: 'rgba(245, 245, 245, 0.5)',
        minHeight: '150vh',
    };

    const stylingLogo = {
        marginLeft: '10px',
        marginTop: '15px',
        fontSize: '20px',
    };

    const stylingTop = {
        position: 'relative',
        paddingBottom: '30px',
        marginTop: '60px',
        fontSize: '17px',
    };

    const lastLi = {
        position: 'relative',
        marginTop: '50vh',
    };

    return (
        <>
            <div className="columns">
                <div style={styleNav} className="column is-one-fifth is-align-content-space-between">
                    <aside className="menu">
                        <h1 style={stylingLogo} className="menu-label">
                            <a href="/">RxReMinder</a>
                        </h1>
                        <hr />
                        <ul style={stylingTop} className="menu-list">
                            <span><a href="/dashboard"><i className="fa-solid fa-cubes fa-xl"></i> DashBoard</a></span>
                            <span><a href="/prescriptions"><i className="fa fa-pencil" aria-hidden="true"></i> Manage Prescriptions</a></span>
                            <span>
                                <a href="/prescriptions/new">
                                    <i className="fa-solid fa-prescription-bottle-medical fa-xl"></i>
                                    New Prescription
                                </a>
                            </span>
                            <span><a href="/profile"><i className="fa-solid fa-user fa-xl"></i> My Profile</a></span>

                            <span onClick={() => { handleLogout(); }}><a style={lastLi} href="/login"><i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i>   Log Out</a></span>
                        </ul>
                    </aside>
                </div>
                <div className="body-content column">
                    {children}
                </div>
            </div>
        </>
    );
}