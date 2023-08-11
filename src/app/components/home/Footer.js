"use client";
import styles from 'src/app/css/footer.module.css';
import 'src/app/css/globals.css';

export default function HomeFooter() {
    return (
        <footer className={`footer ${styles.footer}`} id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 footer-contact">
                            <img
                                src="/assets/logo2.png"
                                alt="Logo"
                                className={styles.logoImage}
                                style={{
                                    width: '100px',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`container ${styles.footerContainer}`}>
                <div className="columns is-vcentered is-flex justify-content-between">
                    <div className={`column ${styles.footerLeft}`}>
                        <div className="copyright">
                            &copy; <strong><span>2023</span></strong> All Rights Reserved
                        </div>
                    </div>
                    <div className={`column ${styles.footerRight}`}>
                        <div className="copyright">
                            <i className="bx bx-chevron-right"></i>{" "}
                            <a href="#" className={styles.greyLinks}>
                                Terms of service
                            </a>
                            <i className="bx bx-chevron-right"></i>{" "}
                            <a href="#" className={styles.greyLinks}>
                                Privacy policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}