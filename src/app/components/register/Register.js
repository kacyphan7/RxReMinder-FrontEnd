'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import fa from '@/app/assets/fontawesome.js';
import brands from '@/app/assets/brands.js';
import solid from '@/app/assets/solid.js';
import Image from 'next/image';
import pillBox from '@/app/assets/pillBox.jpg';
import TopBar from '../home/TopBar';

export default function Register() {

    const overlayStyle = {
        // marginTop: '200px',
        // marginLeft: '270px',
        // textShadow: '5px 5px 5px ',
        // position: 'absolute',
    };

    const containerStyle = {
        marginTop: '100px',
    };

    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleBirthdate = (e) => {
        setBirthdate(e.target.value);
    };

    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };

    const parseBirthdate = (birthdate) => {
        let date = new Date(birthdate);
        date.setDate(date.getDate() + 1);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            email,
            password,
            firstName,
            lastName,
            birthdate: parseBirthdate(birthdate),
            phoneNumber,
            timezone: (new Date().getTimezoneOffset()) / 60,
        };

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/signup`, newUser)
            .then(response => {
                setRedirect(true);
            })
            .catch(error => {
                if (error.response.data.message === 'Email already exists') {
                    console.log('===> Error in Signup', error.response.data.message);
                    setError(true);
                }
            });
    };

    useEffect(() => {
        // This forces a rerender, so the page is rendered
        // the second time but not the first
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    if (redirect) router.push('/');

    return (
        <>
            <TopBar />
            {error ? <p className="error">Email already exists.</p> : null}
            <div style={{ marginTop: '30px', marginBottom: '35px' }}>
                <div className="container has-text-centered is-full-height animate__animated animate__fadeInDown" style={{ backgroundColor: 'rgba(245, 245, 245, 0.5)' }}>
                    <div className="columns is-7 is-variable box">
                        <div className="column is-two-thirds has-text-left">
                            <div>
                                <Image src={pillBox}
                                    height={400}
                                    width={800}
                                    alt="Pill Box"
                                />
                            </div>
                            {/* <div className='is-overlay'> */}
                            <div style={overlayStyle} className="social-media is-relative">
                                <h1 className="title is-1">RxReMinder</h1>
                            </div>
                            {/* </div> */}
                        </div>
                        <div className='column'>
                            <form onSubmit={handleSubmit}>
                                <div className="field">
                                    <label htmlFor="email">Email</label>
                                    <div className="control has-icons-right">
                                        <input className="input is-rounded" name="email" value={email} onChange={handleEmail} type="email" placeholder="Email (required)" required />
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="password">Password</label>
                                    <div className="control has-icons-right">
                                        <input className="input is-rounded" name="password" value={password} onChange={handlePassword} type="password" placeholder="Password (required)" required />
                                        <span className="icon is-small is-right">
                                            <i className="fa-solid fa-key"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="firstName">First Name</label>
                                    <div className="control has-icons-right">
                                        <input className="input is-rounded" name="firstName" value={firstName} onChange={handleFirstName} type="text" placeholder="First Name (required)" required />
                                        <span className="icon is-small is-right">
                                            <i className="fa-solid fa-user"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="lastName">Last Name</label>
                                    <div className="control has-icons-right">
                                        <input className="input is-rounded" name="lastName" value={lastName} onChange={handleLastName} type="text" placeholder="Last Name (required)" required />
                                        <span className="icon is-small is-right">
                                            <i className="fa-solid fa-user"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="birthdate">Birthdate</label>
                                    <div className="control has-icons-right">
                                        <input className="input is-rounded" name="birthdate" value={birthdate} onChange={handleBirthdate} type="date" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <div className="control has-icons-right">
                                        <input className="input is-rounded" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumber} type="tel" placeholder="Phone Number" />
                                        <span className="icon is-small is-right">
                                            <i className="fa-solid fa-phone"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control has-icons-right">
                                        <button className="button is-rounded is-fullwidth" type='submit'>Register</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <span className='icon is-right'><a href='/'><i className="fa-solid fa-person-walking-arrow-loop-left fa-xl"></i></a></span>
                    </div>
                </div>
            </div>
        </>
    );
};