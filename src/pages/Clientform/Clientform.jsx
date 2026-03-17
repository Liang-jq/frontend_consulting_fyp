import React, { useState } from 'react'
import './Clientform.css'
import { useParams } from 'react-router-dom';

const Clientform = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    counsellor_id: id,
    name: '',
    email: '',
    phone: '',
    type: '',
    date: '',
    time: '',
    issue: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="appointment-page">
      <div className="appointment-container">
        <div className="appointment-card">
          <div className="appointment-header">
            <h2>Book your counselling session</h2>
          </div>

          <form className="appointment-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label>Name (same as NRIC) <span className="req">*</span></label>
              <input type="text" name="name" placeholder="As per NRIC" onChange={handleChange} />
            </div>

            <div className="input-group">
              <label>Email <span className="req">*</span></label>
              <input type="email" name="email" placeholder="Gmail Only" onChange={handleChange} />
            </div>

            <div className="input-group">
              <label>Phone Number <span className="req">*</span></label>
              <input type="tel" name="phone" placeholder="e.g. 6012-3456789" onChange={handleChange} />
            </div>

            <div className="input-group-ratio">
              <label>Group/Individual <span className="req">*</span></label>
              <div className="radio-row">
                <label className="radio-item">
                  <input type="radio" name="type" value="Group" checked={formData.type === 'Group'} onChange={handleChange} />
                  <span>Group</span>
                </label>
                <label className="radio-item">
                  <input type="radio" name="type" value="Individual" checked={formData.type === 'Individual'} onChange={handleChange} />
                  <span>Individual</span>
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Section Date <span className="req">*</span></label>
                <input type="date" name="date" onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Section Time <span className="req">*</span></label>
                <select name="time" className='input-group-time' onChange={handleChange}>
                  <option value="">Select Time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Issue <span className="req">*</span></label>
              <div className="issue-grid">
                {['Relationship', 'Motivation', 'Emotional Regulation', 'Family Issues', 'Addiction', 'Career', 'Stress'].map((item) => (
                  <label key={item} className="radio-item">
                    <input type="radio" name="issue" value={item} onChange={handleChange} />
                    <span>{item}</span>
                  </label>
                ))}
                <label className="radio-item other-box">
                  <input type="radio" name="issue" value="Other" onChange={handleChange} />
                  <span>Other:</span>
                  <input type="text" name="otherIssue" className="inline-input" onChange={handleChange} />
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