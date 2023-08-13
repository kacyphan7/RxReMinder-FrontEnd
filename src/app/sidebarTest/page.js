'use client';

import { useEffect, useState } from 'react';
import fa from 'src/app/assets/fontawesome.js';
import brands from 'src/app/assets/brands.js';
import solid from 'src/app/assets/solid.js';
import { useRouter } from 'next/router';
import handleLogout from "src/app/utils/handleLogout.js";

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
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
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
        paddingTop: '50vh', //change to margin top
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
                            <span><a><i className="fa-solid fa-magnifying-glass fa-xl"></i> Search</a></span>
                            <span><a><i className="fa-solid fa-prescription-bottle-medical fa-xl"></i>  New Prescription</a></span>
                            <span><a href="/userTest"><i className="fa-solid fa-gear fa-xl"></i> My Account</a></span>

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