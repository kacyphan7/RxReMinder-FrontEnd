"use client";
import styles from '@/app/css/content2.module.css';
import '@/app/css/globals.css';

import Link from 'next/link';

export default function HomeBody() {
    return (
        <main className={styles.main}>
            <h2 className={`${styles.blueText} ${styles.center} ${styles.bold} ${styles.biggerFont}`}>Our Services</h2>
            <p className={styles.center}>RxReMinder streamlines and simplifies the management of your family's healthcare.</p>
            <div className={styles.section}>
                <div className={styles.worksChecklist}>
                    <div className={`${styles.name} ${styles.bold}`}><span className={styles.checkIcon}>✓</span>Community-Driven</div>
                    <p>
                        Choose from a growing list of medications created by the RxReMinder community.
                    </p>
                    <div className={`${styles.name} ${styles.bold}`}><span className={styles.checkIcon}>✓</span>Comprehensive</div>
                    <p>
                        If your medication isn't yet supported, add a custom medication to the database. Include custom directions related to your medication.
                    </p>
                    <div className={`${styles.name} ${styles.bold}`}><span className={styles.checkIcon}>✓</span>Consistent</div>
                    <p>
                        Receive an email notification on your mobile device when it's time for a dose.
                    </p>
                    <div className={`${styles.name} ${styles.bold}`}><span className={styles.checkIcon}>✓</span>Convenient</div>
                    <p>
                        <Link href="/register">Register</Link> to manage your medications from any device.
                    </p>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1624711076872-ecdbc5ade023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="reminder"
                    className={`${styles.homeImage} ${styles.widerImage}`}
                />
            </div>
        </main>
    );
}

