import React, { useEffect, useState } from "react"
import "./Clientform.css"
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify'
import Navbar from "../../components/Navbar/Navbar"

const Clientform = () => {
  const { id } = useParams()
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [availableSlots, setAvailableSlots] = useState([]);

  const [formData, setFormData] = useState({
    counsellor_id: id,
    user_id: storedUser?.user_id,
    name: "",
    email: "",
    phone: "",
    type: "",
    date: "",
    time: "",
    issue: "",
  })

  
  useEffect(() => {
    if (!formData.date) return;

    const fetchSlots = async () => {
      try {
        const res = await axios.get(
          `http://localhost/backend_consult/api/getAvailableSlots.php`,
          {
            params: {
              counsellor_id: id,
              date: formData.date,
            },
          }
        );

        setAvailableSlots(res.data);
        console.log("Available:", res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSlots();
  }, [id, formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "otherIssue") {
      setFormData({ ...formData, issue: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));

    try {
      const res = await axios.post(
        "http://localhost/backend_consult/api/bookAppointment.php",
        form, // no Content-Type header needed
      );
      console.log("API response:", res.data);
      console.log("Stored user:", storedUser);
      console.log("User ID:", storedUser?.id);

      if (res.data.success){
        toast.success("Appointment booked!");  // Success toast
      } 

      else alert("Failed to book appointment");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="appointment-page">
      <Navbar/>
      <div className="appointment-container">
        <div className="appointment-card">
          <div className="appointment-header">
            <h2>Book your counselling session</h2>
          </div>

          <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name (same as NRIC) <span className="req">*</span></label>
              <input type="text" name="name" placeholder="As per NRIC" value={formData.name} onChange={handleChange} required/>
            </div>

            <div className="input-group">
              <label>Email<span className="req">*</span></label>
              <input type="email" name="email" placeholder="Gmail Only" value={formData.email} onChange={handleChange} required/>
            </div>

            <div className="input-group">
              <label>Phone Number<span className="req">*</span></label>
              <input type="tel" name="phone" placeholder="e.g. 6012-3456789" value={formData.phone} onChange={handleChange} required/>
            </div>

            <div className="input-group-ratio">
              <label>Group/Individual <span className="req">*</span></label>
              <div className="radio-row">
                <label className="radio-item">
                  <input type="radio" name="type" value="Group" checked={formData.type === "Group"} onChange={handleChange} required/>
                  <span>Group</span>
                </label>
                <label className="radio-item">
                  <input type="radio" name="type" value="Individual" checked={formData.type === "Individual"} onChange={handleChange}/>
                  <span>Individual</span>
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Section Date<span className="req">*</span></label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label>Section Time <span className="req">*</span></label>
                <select name="time" className="input-group-time" value={formData.time} onChange={handleChange} required>
                  <option value="">Select Time</option>
                  {availableSlots.map((slot, index) => (
                    <option key={index} value={slot.start}>
                      {new Date(slot.start).toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Issue <span className="req">*</span></label>
              <div className="issue-grid">
                {["Relationship","Motivation","Emotional Regulation","Family Issues","Addiction", "Career","Stress",].map((item) => (
                  <label key={item} className="radio-item">
                    <input type="radio" name="issue" value={item} checked={formData.issue === item} onChange={handleChange} required/>
                    <span>{item}</span>
                  </label>
                ))}
                <label className="radio-item other-box">
                  <input type="radio" name="issue" value="Other" checked={formData.issue === "Other"} onChange={handleChange}/>
                  <span>Other:</span>
                  <input type="text" name="otherIssue" className="inline-input" value={ formData.issue === "Other"? formData.otherIssue || "": ""} onChange={(e) => setFormData({ ...formData, issue: e.target.value })}/>
                </label>
              </div>
            </div>

            <div className="form-footer">
              <p className="note">Your information is kept confidential.</p>
              <button type="submit" className="submit-appointment-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Clientform