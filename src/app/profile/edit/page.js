'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';

import Layout from '@/app/components/sidebar/SideBar';
import styles from 'src/app/css/edit-user.module.css';
import 'src/app/css/logged-in.css';

export default function UserProfile() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [isDeleting, setIsDeleting] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showNotification, setShowNotification] = useState(false);

	const parseBirthdate = (birthdate) => {
		let date = new Date(birthdate);
		date.setDate(date.getDate() + 1);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let formattedDate = `${year}-${month}-${day}`;
		return formattedDate;
	}

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update user data on the server
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
            firstName,
            lastName,
            email,
            birthdate: parseBirthdate(birthdate),
            phoneNumber,
        })
            .then(response => {
                setShowNotification(true); // Show the notification
                setTimeout(() => {
                    setShowNotification(false); // Hide the notification after 2 seconds
                    router.push('/profile'); // Redirect to the profile page
                }, 3000);
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };


    const handleDeleteAccount = () => {
        if (typeof window !== 'undefined') {
            setAuthToken(localStorage.getItem('jwtToken'));
            axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
                .then(response => {
                    console.log('Account deleted successfully.');
                    handleLogout(); // Handle the logout
                    router.push('/register'); // Redirect to the registration page after deletion
                })
                .catch(error => {
                    console.error('Error deleting account:', error);
                    handleLogout();
                });
        }
    };

    if (typeof window !== 'undefined') {
        const expiration = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime > expiration) {
            handleLogout();
            router.push('/login');
        }
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                .then((response) => {
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setUser(response.data.users[0]);
                        setIsLoading(false);
                    } else {
                        router.push('/login');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    router.push('/login');
                });
        } else {
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setBirthdate(user.birthdate);
            setPhoneNumber(user.phoneNumber);
        }
    }, [user]);

    if (!user) return <div>Loading...</div>;

    return (
        <Layout>
            <div className={styles.editContainer}>
                <form onSubmit={handleSubmit} className={styles.editForm}>
                {/* <h1 className="title is-3 edit-profile-heading">Edit User Profile</h1> */}
                <h1 className={styles.editHeading}>Edit User Profile</h1> 
                
                {showNotification && (
                    <div className="notification is-success">
                        Changes have been saved.
                    </div>
                )}
                    <div className={styles.field}>
                        <label className="label">First Name:</label>
                        <div className={styles.control}>
                            <input
                                className="input"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className="label">Last Name:</label>
                        <div className={styles.control}>
                            <input
                                className="input"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className="label">Email:</label>
                        <div className={styles.control}>
                            <input
                                className="input"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className="label">Birthdate:</label>
                        <div className={styles.control}>
                            <input
                                className="input"
                                type="date"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className="label">Phone Number:</label>
                        <div className={styles.control}>
                            <input
                                className="input"
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.control}>
                            <button className={styles.editButton} type="submit">Save Changes</button>
                            <button
                                type="button is-fullwidth"
                                className={styles.deleteButton}
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                    <span className='icon is-right'><a onClick={() => router.push('/profile')}><i className="fa-solid fa-person-walking-arrow-loop-left fa-xl"></i></a></span>
                </form>
            </div>
        </Layout>
    );
}