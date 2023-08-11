"use client";
import styles from 'src/app/css/head.module.css';
import 'src/app/css/globals.css';

export default function HomeHead() {
  return (
    <div className={`card ${styles.cardContainer}`}>
      <div className="card-content">
        <div className="columns">
          <div className={styles.headerContainer}>
            <div
              className={`${styles.imageContainer} ${styles.blueBackground}`}
            >
              <img
                src="https://miro.medium.com/v2/resize:fit:1500/0*w8VGpPwMn91jPdND"
                alt="Header Image"
                className={styles.image}
              />
            </div>
          </div>
          <div className={`column ${styles.textContainer}`}>
            <h1 className="title is-3">
              Welcome to Our Medication Tracker App
            </h1>
            <img
              src="https://cdn.dribbble.com/users/4279575/screenshots/15172726/media/5ab1a89af8aedba97f59be8564b3af82.gif"
              alt="Header Right Image"
              className={styles.image}
            />
            <p className="subtitle">
              We provide quality healthcare medication reminder services for you
              and your family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}