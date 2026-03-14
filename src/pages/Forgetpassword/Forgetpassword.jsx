import React from 'react'
import './Forgetpassword.css'
import { Link } from 'react-router-dom'

const Forgetpassword = () => {
  return (
    <div className="forget-page">
        <div className="forget-container">
            <div className="forget-header">
                <h1>Forgot Password</h1>
                <p>Enter your email address and we'll send you a link to reset your password.</p>
            </div>
        
            <div className="forget-box">
                <form className="forget-form">
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="e.g. 12345@siswa.unimas.my" required />
                    </div>

                    <button type="submit" className="reset-btn">Send Reset Link</button>

                    <div className="forget-footer-links">
                        <Link to="/loginuser">Back to Login</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Forgetpassword