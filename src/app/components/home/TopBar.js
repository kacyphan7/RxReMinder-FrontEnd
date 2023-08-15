"use client";
import styles from '@/app/css/topBar.module.css';
import '@/app/css/globals.css';

import Link from 'next/link';

export default function TopBar() {
    return (
        <nav
            className={`navbar ${styles.navbar}`}
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <div className={`navbar-item ${styles.navbarItem}`}>
                    <img
                        src="/assets/logo2.png"
                        alt="Logo"
                        className={styles.logoImage}
                        style={{
                            width: '150px',
                        }}
                    />
                </div>
            </div>

            <div className={`navbar-end ${styles.buttons}`}>
                <div className="navbar-item">
                    <div className="buttons">
                        <Link className={`button is-light`} href="/login">
                            Login
                        </Link>
                        <Link className={`button is-info`} href="/register">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}