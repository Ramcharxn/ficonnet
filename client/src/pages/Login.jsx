import React, {useContext} from 'react'
import { useState } from 'react';
import firebase from '../firebase';
import { Navigate, Link } from "react-router-dom"
import { AuthContext } from "../component/Auth";
import axios from 'axios';

export default function Login() {
    const [number, setNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [notification, setNotification] = useState('')

    const user = useContext(AuthContext)
    // console.log('from login....',user.currentUser)

if (user.currentUser !== null) {
    return <Navigate to="/home" replace />;
}
  
    const configureCaptcha = () => {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          
          onSignInSubmit();
          console.log('recapctha verified')
        },
        defaultCountry: 'IN'
      });
    }
  
    const onSignInSubmit = (e) => {
      e.preventDefault()
      configureCaptcha()
  
      const phoneNumber = "+1 "+number
      console.log(phoneNumber)

      axios.post('http://localhost:5000/checkUser',{number})
      .then(res => {
        if(res.data === 'number not registered'){
          setNotification(res.data + ' please create a account')
        } else {
          const appVerifier = window.recaptchaVerifier;
          firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
              .then((confirmationResult) => {
                
                window.confirmationResult = confirmationResult;
                setNotification('otp sent')
                
              }).catch((error) => {
                
                console.log('error',error.message)
                setNotification('sms not sent, try again later')
              });
        }
      })
  
      
    }
  
    const onSubmitOTP = (e) => {
      e.preventDefault()
  
      const code = otp
      console.log(otp)
      window.confirmationResult.confirm(code)
      .then(() => {
        // const user = result.user
        // console.log(JSON.stringify(user))
        console.log('user verified')
      })
      .catch(err => {
        console.log(err.message)
      })
    }

  return (
    <div className="App">
    <h2>Login Form</h2>
    <form onSubmit={onSignInSubmit}>
      <div id="sign-in-button"></div>
      <input type="number" name='mobile' placeholder='Mobile number' onChange={(e) => setNumber(e.target.value)} value={number} required />
      <button type="submit">Submit</button>
    </form>
    <h2>Enter otp</h2>
    <form onSubmit={onSubmitOTP}>
      <input type="number" name='otp' onChange={(e) => setOtp(e.target.value)} value={otp} placeholder='OTP number' required />
      <button type="submit">Submit</button>
    </form>

    <p>{notification}</p>

    Dont have a account <Link to='/signup'>Signup</Link>
  </div>
  )
}
