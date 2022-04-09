import React, { useContext } from 'react'
import { useState } from 'react';
import firebase from '../firebase';
import { Navigate, Link } from "react-router-dom"
import { AuthContext } from "../component/Auth";
import axios from 'axios';

export default function Login() {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')
    const [company, setCompany] = useState('')

    const [display, setDisplay] = useState(true)

    const [otp, setOtp] = useState('')
    const [notification, setNotification] = useState('')

    const user = useContext(AuthContext)
    // console.log('from login....',user.currentUser)

    if (user.currentUser !== null) {
        return <Navigate to="/home" replace />;
    }

    const Captcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {

                onSignUpSubmit();
                console.log('recapctha verified')
            },
            defaultCountry: 'IN'
        });
    }

    const onSignUpSubmit = (e) => {
        e.preventDefault()
        Captcha()

        const phoneNumber = "+1 " + number
        console.log(phoneNumber)

        axios.post('http://localhost:5000/verifyUser', { email, number })
            .then(res => {
                if (res.data === 'number already exist') {
                    setNotification(res.data + ' if it is you try logging')
                } else if (res.data === 'email already exist') {
                    setNotification(res.data)
                } else {
                    console.log(res.data)
                    const appVerifier = window.recaptchaVerifier;
                    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                        .then((confirmationResult) => {

                            window.confirmationResult = confirmationResult;
                            setNotification('otp sent')

                            setDisplay(false)

                        }).catch((error) => {

                            console.log('error', error.message)
                            setNotification('sms not sent, try again later')
                        });
                }
            })
            .catch(err => setNotification(err.message))


    }

    const onSubmitOTP = (e) => {
        e.preventDefault()

        const code = otp
        console.log(otp)
        window.confirmationResult.confirm(code)
            .then(() => {
                // const user = result.user
                // console.log(JSON.stringify(user))
                axios.post('http://localhost:5000/createUser',{fname, lname, email, number, type, company})
                    .then(() => console.log('user created'))
                    .catch(err => console.log(err.message))
                setNotification('user verified')
            })
            .catch(err => {
                setNotification('incorrect otp')
            })
    }

    return (
        display ? (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={onSignUpSubmit}>
                    <div id="sign-in-button"></div>
                    <input type="radio" value="Individual" onChange={e => setType(e.target.value)} name="gender" /> Individual <br />
                    <input type="radio" value="Corporate" onChange={e => setType(e.target.value)} name="gender" /> Corporate <br />
                    <input type="text" value={fname} onChange={e => setFname(e.target.value)} placeholder='First Name' /> <br />
                    <input type="text" value={lname} onChange={e => setLname(e.target.value)} placeholder='Last Name' /> <br />
                    <input type="number" value={number} onChange={e => setNumber(e.target.value)} placeholder='Phone number' /> <br />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' /> <br />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' /> <br />
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder='company' /> <br />

                    <input type="checkbox" required /> <Link to='/terms'>agree to terms and condition</Link> <br />

                    <button type="submit">SignUp</button>
                </form>
                {notification}

                already having a account? <Link to='/login'>Login</Link>
            </div>

        ) :
            (
                <div>
                    <form onSubmit={onSubmitOTP}>
                        <input type="number" onChange={(e) => setOtp(e.target.value)} value={otp} placeholder='OTP number' required />
                        <button type="submit">Submit</button>
                    </form>
                    <button onClick={() => setDisplay(true)}>Change details ?</button>
                </div>
            )
    )
}
