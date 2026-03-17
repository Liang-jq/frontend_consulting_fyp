import React, { useEffect, useState } from 'react'
import './EditProfileCounsellor.css'
import axios from 'axios';
import { assets } from '../../assets/assets';

const EditProfileCounsellor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matric_number: "",
    phone: "",
    languages: [],
    year: "",
    description: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const id = storedUser?.id;
    axios.get(`http://localhost/backend_consult/api/getProfile.php?id=${id}`)
    .then(res => {
      const data = res.data;
      setFormData({
        id: id,
        name: data.name || "",
        email: data.email || "",
        matric_number: data.matric_number || "",
        phone: data.phone || "",
        languages: data.languages ? data.languages.split(",") : [],
        year: data.year || "",
        description: data.description || ""
      })
    })
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLanguageChange = (lang) => {
    let updated = [...formData.languages];

    if (updated.includes(lang)) {
      updated = updated.filter((l) => l !== lang);
    } else {
      updated.push(lang);
    }

    setFormData({ ...formData, languages: updated });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const res = await axios.post(
        "http://localhost/backend_consult/api/editProfileCounsellor.php",
        formData
      )

      console.log(res.data);

      if(res.data.success){
        alert("Profile updated successfully");
        window.location.href = "/profile";
      } else {
      alert(res.data.error);
    }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="page-container">
      <div className="form-wrapper">
        <div className="profile-header">
          <div className="profile-pic-container">
            <div className="profile-pic"></div>
            <button className="edit-pic-btn"><img src={assets.edit_icon}/></button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>General Information</h3>
          
          <div className="form-group">
            <label>Name (same as NRIC)</label>
            <input type="text" name="name" value={formData.name} required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email (Gmail) </label>
            <input type="email" name="email" value={formData.email} disabled />
          </div>

          <div className="row">
            <div className="form-group half">
              <label>Matric Number</label>
              <input type="text" name="matricNumber" value={formData.matric_number} disabled/>
            </div>
            <div className="form-group half">
              <label>Phone Number</label>
              <input type="text" name="phone" value={formData.phone} required onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="form-group half">
              <label>Language (can choose more than 1) </label>
              {['English', 'Malay', 'Chinese', 'Iban', 'Kadazan'].map(lang => (
                <div key={lang} className="checkbox-item">
                  <input type="checkbox" value={formData.languages} onChange={handleChange} /> {lang}
                </div>
              ))}
              <div className="checkbox-item">
                Other: <input type="text" value={formData.languages} className="inline-input" />
              </div>
            </div>

            <div className="form-group half">
              <label>Year</label>
              {[1, 2, 3, 4].map(y => (
                <div key={y} className="checkbox-item">
                  <input type="radio" name="year" value={formData.year} onChange={handleChange} /> {y}
                </div>
              ))}
              <div className="checkbox-item">
                 Other: <input type="text" value={formData.year} name="otherYear" className="inline-input" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Description about counsellor</label>
            <textarea name="description" rows="6" value={formData.description} onChange={handleChange}></textarea>
          </div>

          <div className="button-container">
            <button type="submit" className="save-btn">Save</button>
          </div>
  </form>
      </div>
    </div>
  )
}

export default EditProfileCounsellor