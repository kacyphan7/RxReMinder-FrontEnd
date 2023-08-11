"use client";
import styles from 'src/app/css/content2.module.css';
import 'src/app/css/globals.css';

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
                    src="https://media.istockphoto.com/id/1336975032/vector/a-person-using-pill-reminder-mobile-app-for-medication-medication-tracker.jpg?s=612x612&w=0&k=20&c=K4a_t68PWnXWq-CTOitGvnaRlcNejT1IcJ4Dp4_KvpI="
                    alt="reminder"
                    className={`${styles.homeImage} ${styles.widerImage}`}
                />
            </div>
        </main>
    );
}

