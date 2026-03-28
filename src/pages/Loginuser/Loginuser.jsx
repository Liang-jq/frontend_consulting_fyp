import React, { useState } from 'react'
import axios from 'axios'
import './Loginuser.css'
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import RegisNavbar from '../../components/RegisNavbar/RegisNavbar';

const Loginuser = () => {
    const navigate=useNavigate()
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleLogin=async(e)=>{
        e.preventDefault()

        try{
            const response = await axios.post(
                "http://localhost/backend_consult/api/login.php",
                formData
            )

            console.log(response.data);

            if (response.data.success) {
                const user = {
                    user_id: response.data.user_id,
                    counsellor_id: response.data.counsellor_id,
                    name: response.data.name,
                    email:response.data.email,
                    role: response.data.role
                }

                // ✅ SAVE
                localStorage.setItem("user", JSON.stringify(user));

                if (user.role === "user") window.location.href = "/";
                if (user.role === "counsellor") window.location.href = "/counsellordashboard";
                if (user.role === "admin") window.location.href = "/admindashboard";
            } else {
                alert(response.data.error);
            }
        }catch(err){
            console.log(err)
            alert("Server error")
        }
    }

    return (
        <div className="login-page">
            <RegisNavbar/>
            <div className="login-container">
                <h1 className="login-header">Login</h1>
                <div className="login-box">
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" placeholder="" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <div className="password-wrapper">
                                <input type={showPassword ? "text" : "password"} placeholder="" name="password" value={formData.password} onChange={handleChange} required/>
                                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>
                            <a href="/forgetpassword" className="forgot-link">Forget password?</a>
                        </div>

                        <button type="submit" className="login-btn">Login</button>

                        <p className="register-text">
                            Have'nt have a account yet? <Link to="/registeruser">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Loginuser