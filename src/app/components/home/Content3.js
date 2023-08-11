"use client";
import styles from 'src/app/css/content3.module.css';
import 'src/app/css/globals.css';

export default function HomeBody() {
    return (
        <main className={styles.main}>
            <div className={styles.section}>
                <h2>Meet Our Team</h2>
                <p>
                    Our experienced and dedicated team is here to remind you to take your
                    medications on time.
                </p>
            </div>
        </main>
    );
}