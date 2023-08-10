"use client";
import styles from 'src/app/css/home.module.css';
import 'src/app/css/globals.css';

export default function HomeBody() {
    return (
        <main className={styles.main}>
            <div className={styles.section}>
                <h2>Welcome to Our RxReMinder App</h2>
                <p>We provide quality healthcare medication reminder services for you and your family.</p>
            </div>

            <div className={styles.section}>
                <h2>Our Services</h2>
                <p>We offer a wide range of reminder services to keep you healthy.</p>
            </div>

            <div className={styles.section}>
                <h2>Meet Our Team</h2>
                <p>Our experienced and dedicated team is here to remind you to take your medications on time.</p>
            </div>
        </main>
    );
}
