'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
	const router = useRouter();
	const [redirect, setRedirect] = useState(false);

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
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			email,
			password,
            firstName,
            lastName,
			birthdate: parseBirthdate(birthdate),
            phoneNumber,
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

	if (redirect) router.push('/');
	
    
	return (
        <>
            {error ? <p className="error">Email already exists.</p> : null}
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <div className="control">
                        <input className="input" name="email" value={email} onChange={handleEmail} type="email" placeholder="Email (required)" required />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <div className="control">
                        <input className="input" name="password" value={password} onChange={handlePassword} type="password" placeholder="Password (required)" required />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="firstName">First Name</label>
                    <div className="control">
                        <input className="input" name="firstName" value={firstName} onChange={handleFirstName} type="text" placeholder="First Name (required)" required />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="control">
                        <input className="input" name="lastName" value={lastName} onChange={handleLastName} type="text" placeholder="Last Name (required)" required />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="birthdate">Birthdate</label>
                    <div className="control">
                        <input className="input" name="birthdate" value={birthdate} onChange={handleBirthdate} type="date" required />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <div className="control">
                        <input className="input" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumber} type="tel" placeholder="Phone Number" />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button" type='submit'>Register</button>
                    </div>
                </div>
            </form>
        </>
	);
};