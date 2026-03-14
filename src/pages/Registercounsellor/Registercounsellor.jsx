import React, { useState } from 'react'
import './Registercounsellor.css'
import axios from 'axios'
import { assets } from '../../assets/assets';
import { Eye, EyeOff } from 'lucide-react';

const Registercounsellor = () => {
    const [showPassword,setShowPassword]=useState(false);
    const [showRetypePassword,setShowRetypePassword]=useState(false);
    const languages = ["English", "Malay", "Chinese", "Iban", "Kadazan"];
    const years = ["1", "2", "3", "4"];

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        retypePassword:"",
        matric_number:"",
        phone:"",
        languages:[],
        year:"",
        description:""
    })

    const handleChange=(e)=>{
        setFormData({
        ...formData,
        [e.target.name]:e.target.value
        })
    }

    const handleLanguageChange=(e)=>{
        const value = e.target.value

        setFormData(prev=>{
            if(prev.languages.includes(value)){
                return {
                    ...prev,
                    languages: prev.languages.filter(l=>l!==value)
                }
            }else{
                return {
                    ...prev,
                    languages:[...prev.languages,value]
                }
            }
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        console.log(formData)

        if(formData.password !== formData.retypePassword){
            alert("Passwords do not match")
            return
        }

        try{
            const response = await axios.post(
                "http://localhost/backend_consult/api/counsellor.php",
                formData
            )

            console.log(response.data)

            if(response.data.success){
                alert("Counsellor registered successfully")

                setFormData({
                    name:"",
                    email:"",
                    password:"",
                    retypePassword:"",
                    matric_number:"",
                    phone:"",
                    languages:[],
                    year:"",
                    description:""
                })
            }else{
                alert(response.data.error)
            }
        }catch(error){
            console.error(error)
            alert("Server error")
        }
    }
    
    return (
        <div className='nav-container'>
            <div className="form-wrapper">
                <img src={assets.counselling_Register_icon} alt="Counselling" />

                <div className="reg-card">
                    <h2 className="form-title">Counsellor Trainee Register Information</h2>
          
                    <form className="trainee-form" onSubmit={handleSubmit}>
                        <div className="full-width">
                            <label>Name (same as NRIC) <span className="req">*</span></label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="full-width">
                            <label>Email (Gmail) <span className="req">*</span></label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className="full-width">
                            <label>Password <span className="req">*</span></label>
                            <div className="password-wrapper">
                                <input type={showPassword?"text":"password"} name="password" value={formData.password} onChange={handleChange} required />
                                <span className='password-toggle' onClick={()=>setShowPassword(!showPassword)}>
                                    {showPassword? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                        </div>

                        <div className="full-width">
                            <label>Retype Password <span className="req">*</span></label>
                            <div className="password-wrapper">
                                <input type={showRetypePassword?"text":"password"} name="retypePassword" value={formData.retypePassword} onChange={handleChange} required />
                                <span className='password-toggle' onClick={()=>setShowRetypePassword(!showRetypePassword)}>
                                    {showRetypePassword? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="half-width">
                                <label>Matric Number <span className="req">*</span></label>
                                <input type="text" name="matric_number" value={formData.matric_number} onChange={handleChange} required />
                            </div>

                            <div className="half-width">
                                <label>Phone Number <span className="req">*</span></label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="row options-row">
                            <div className="half-width">
                                <label>Language (can choose more than 1 language) <span className="req">*</span></label>
                                <div className="checkbox-group">
                                    {languages.map(lang => (
                                        <label key={lang} className="check-label">
                                            <input type="checkbox" value={lang} checked={formData.languages.includes(lang)} onChange={handleLanguageChange} name="lang" />{lang}
                                        </label>
                                    ))}
                                    <div className="other-input">
                                        <input type="checkbox" /> Other: <input type="text" className="inline-input" />
                                    </div>
                                </div>
                            </div>

                            <div className="half-width">
                                <label>Year <span className="req">*</span></label>
                                <div className="checkbox-group">
                                    {years.map(year => (
                                        <label key={year} className="check-label">
                                            <input type="radio" name="year" value={year} checked={formData.year === year} onChange={handleChange} /> {year}
                                        </label>
                                    ))}
                                    <div className="other-input">
                                        <input type="radio" name="year" value="Other" checked={formData.year === "Other"} onChange={handleChange}/> Other: <input type="text" className="inline-input" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="full-width">
                            <label>Description about counsellor <span className="req">*</span></label>
                            <textarea rows="6" name="description" value={formData.description} onChange={handleChange} required></textarea>
                        </div>

                        <div className="submit-container">
                            <button type="submit" className="reg-submit-btn">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registercounsellor