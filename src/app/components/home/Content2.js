"use client";
import styles from 'src/app/css/content2.module.css';
import 'src/app/css/globals.css';

export default function HomeBody() {
    return (
        <main className={styles.main}>
            <div className={styles.section}>
                <h2>Our Services</h2>
                <p>We offer a wide range of reminder services to keep you healthy.</p>
                <p>
                    {" "}
                    We provide quality healthcare medication reminder services for you and
                    your family. Login or Register to allow us be your reminder for
                    medication time.
                </p>
                <p>
                    Pick from a list of category your medication is under. Add the list of
                    medications you have according to your prescription. You may also
                    include over the counter Medications and add directions.
                </p>
                <p>
                    Prescription is now added to calendar. Return to Dashboard to view
                    medication list and calendar.
                </p>
                <p>
                    You will get a notification via email or sms when it's time to take
                    your medication according to prescription inputed.
                </p>
            </div>
        </main>
    );
}
