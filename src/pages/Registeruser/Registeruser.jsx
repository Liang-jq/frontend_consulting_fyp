import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Registeruser.css';

const Registeruser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({ name:'', email:'', password:'', retypePassword:'' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.retypePassword) {
      return alert("Passwords do not match!");
    }
    if (!agreed) {
      return alert("Please agree to the terms.");
    }

    try {
      const response = await axios.post('http://localhost/backend_consult/api/users.php', {
        name: formData.name,
        username:formData.name,
        email: formData.email,
        password: formData.password
      });

      alert("Registration Successful! User ID: " + response.data.id);
      setFormData({ name:'', username:'', email:'', password:'', retypePassword:'' });
    } catch (err) {
      console.error("Registration Error:", err.response?.data);
      alert(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className='register-page'>
      <div className="register-container">
        <div className="register-header">
          <h2>Register your account</h2>
        </div>

        <div className="register-box">
          <form className="register-form" onSubmit={handleRegister}>
            <div className="input-group">
              <label>Name (as NRIC)</label>
              <input type="text" name="name" placeholder='As NRIC Name' value={formData.name} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" placeholder='Gmail Only' value={formData.email} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            <div className="input-group">
              <label>Retype password</label>
              <div className="password-wrapper">
                <input type={showRetypePassword ? "text" : "password"} name="retypePassword" value={formData.retypePassword} onChange={handleChange} required />
                <span className="password-toggle" onClick={() => setShowRetypePassword(!showRetypePassword)}>
                  {showRetypePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            <div className="terms-group">
              <input type="checkbox" id="terms" checked={agreed} onChange={() => setAgreed(!agreed)} />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
              </label>
            </div>

            <button type="submit" className="register-btn">Register</button>

            <div className="register-footer-links">
              <Link to="/registercounsellor">Register as a counsellor</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registeruser;