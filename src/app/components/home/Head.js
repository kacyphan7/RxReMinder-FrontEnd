"use client";
import styles from 'src/app/css/home.module.css';
import 'src/app/css/globals.css';

export default function HomeHead() {
  return (
    <div className={styles.flexContainer}>
      <header className={styles.header}>
        <img
          src="https://miro.medium.com/v2/resize:fit:1500/0*w8VGpPwMn91jPdND"
          alt="homeHeader"
          className={styles.headerImage}
        />
      </header>
      {/* Rest of your content */}

    </div>
  );
}