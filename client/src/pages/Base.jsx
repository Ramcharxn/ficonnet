import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Base() {
    const navigate = useNavigate()
  return (
    <div>
        <h2>Home page</h2>
        <button onClick={() => navigate('/home')}>Get Access</button>
    </div>
  )
}
