"use client";
import styles from 'src/app/css/content1.module.css';
import 'src/app/css/globals.css';

export default function HomeBody() {
    return (
        <main className={styles.main}>
            <h2
                className={`${styles.blueText} ${styles.center} ${styles.bold} ${styles.biggerFont}`}
            >
                How It Works
            </h2>
            <div className={styles.section}>
                <div className={styles.worksItem}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4375/4375391.png"
                        alt="Logo"
                        className={styles.logoImage}
                    />
                    <p className={`${styles.blueText} ${styles.bold}`}>Register</p>
                </div>
                <div className={styles.worksItem}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2080/2080887.png"
                        alt="Logo"
                        className={styles.logoImage}
                    />
                    <p className={`${styles.blueText} ${styles.bold}`}>
                        Input Prescription
                    </p>
                    <p></p>
                </div>
                <div className={styles.worksItem}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2132/2132729.png"
                        alt="Logo"
                        className={styles.logoImage}
                    />
                    <p className={`${styles.blueText} ${styles.bold}`}>Add to Calendar</p>
                    <p></p>
                </div>
                <div className={styles.worksItem}>
                    <img
                        src="https://media.istockphoto.com/id/909698486/vector/new-message-dialog-chat-speech-bubble-notification-flat-icon-vector.jpg?s=612x612&w=0&k=20&c=6FM3wIbuFdf9rjSTz5TkqH0RUCG2W0gW-D8uLQU4oUM="
                        alt="Logo"
                        className={styles.logoImage}
                    />
                    <p className={`${styles.blueText} ${styles.bold}`}>Get Notified</p>
                    <p></p>
                </div>
            </div>
        </main>
    );
}
