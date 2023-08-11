"use client";
import styles from 'src/app/css/topBar.module.css';
import 'src/app/css/globals.css';

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
                        <a className={`button is-light`} href="/login">
                            Login
                        </a>
                        <a className={`button is-info`} href="/register">
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}