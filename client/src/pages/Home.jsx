import React ,{ useContext } from 'react'
import { Navigate } from 'react-router-dom';
import app from '../firebase'
import { AuthContext } from "../component/Auth";

export default function Home() {
  const user = useContext(AuthContext)
  console.log('called',typeof(user.currentUser))

  if (user.currentUser === null) {
      return <Navigate replace to='/login' />
  }

  return (
    <div>Home
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  )
}