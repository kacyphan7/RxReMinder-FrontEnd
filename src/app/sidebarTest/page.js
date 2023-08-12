'use client';

import { Children } from "react";
import fa from 'src/app/assets/fontawesome.js';
import brands from 'src/app/assets/brands.js';
import solid from 'src/app/assets/solid.js';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { handleLogout } from "src/app/utils/handleLogout.js";
import layout from "src/app/layout.js";

export default function Layout({ children }) {

    const styleNav = {
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
    };

    const stylingLogo = {
        // position: 'absolute',
        marginLeft: '10px',
        marginTop: '15px',
        // marginBottom: '30px',
        fontSize: '20px',

    };

    const stylingTop = {
        position: 'relative',
        paddingBottom: '30px',
        marginTop: '60px',
        // marginLeft:'10px', 
        fontSize: '17px'

    };

    const lastLi = {
        position: 'relative',
        paddingTop: '50vh',
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
                            <span><a href="/dashboard"><i class="fa-solid fa-cubes fa-xl"></i> DashBoard</a></span>
                            <span><a><i class="fa fa-pencil" aria-hidden="true"></i> Manage Prescriptions</a></span>
                            <span>
                                <a href="/prescriptions/new">
                                    <i className="fa-solid fa-prescription-bottle-medical fa-xl"></i>
                                    New Prescription
                                </a>
                            </span>
                            <span><a href="/userTest"><i class="fa-solid fa-gear fa-xl"></i> My Account</a></span>

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