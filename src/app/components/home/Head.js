"use client";
import styles from '@/app/css/head.module.css';
import '@/app/css/globals.css';

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
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Header Image"
                className={styles.image}
              />
            </div>
          </div>
          <div className={`column ${styles.textContainer}`}>
            <h1 className="title is-3">
              Track your medications with ease and peace of mind.
            </h1>
            <img
              src="https://cdn.dribbble.com/users/4279575/screenshots/15172726/media/5ab1a89af8aedba97f59be8564b3af82.gif"
              alt="Header Right Image"
              className={styles.image}
            />
            <p className="subtitle">
              RxReMinder provides reliable and convenient medication reminder services for you and your family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}