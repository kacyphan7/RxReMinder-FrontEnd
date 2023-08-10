"use client";
import styles from 'src/app/css/home.module.css';
import 'src/app/css/globals.css';

export default function HomeFooter() {
    return (
        <footer className={styles.footer} id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 footer-contact">
                            <h3>RxReMinder</h3>
                        </div>
                        <div className="col-lg-2 col-md-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-md-flex py-4">
                <div className="me-md-auto text-center text-md-start">
                    <div className="copyright">
                        &copy; Copyright <strong><span>RxReMinder</span></strong>. All Rights Reserved
                    </div>
                </div>
                <div className="social-links text-center text-md-right pt-3 pt-md-0">
                    <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                    <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                    <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                    <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                    <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                </div>
            </div>

        </footer>
    );
}