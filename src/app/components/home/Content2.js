"use client";
import styles from '@/app/css/content2.module.css';
import '@/app/css/globals.css';

export default function HomeBody() {
    return (
        <main className={styles.main}>
            <h2 className={`${styles.blueText} ${styles.center} ${styles.bold} ${styles.biggerFont}`}>Our Services</h2>
            <p className={styles.center}> We offer a wide range of reminder services to keep you healthy.</p>
            <div className={styles.section}>
                <div className={styles.worksChecklist}>
                    <div className={`${styles.name} ${styles.bold}`}>Affordable</div>
                    <p>
                        <span className={styles.checkIcon}>✓</span>We provide quality healthcare medication reminder services for you and your family. Login or Register to allow us be your reminder for medication time.
                    </p>
                    <div className={`${styles.name} ${styles.bold}`}>Convenient</div>
                    <p>
                        <span className={styles.checkIcon}>✓</span>Pick from a list of category your medication is under. Add the list of medications you have according to your prescription. You may also include over the counter Medications and add directions.
                    </p>
                    <div className={`${styles.name} ${styles.bold}`}>Support</div>
                    <p>
                        <span className={styles.checkIcon}>✓</span>Prescription is now added to calendar. Return to Dashboard to view medication list and calendar.
                    </p>
                    <div className={`${styles.name} ${styles.bold}`}>Reliable</div>
                    <p>
                        <span className={styles.checkIcon}>✓</span>You will get a notification via email or SMS when it's time to take your medication according to prescription inputed.
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

