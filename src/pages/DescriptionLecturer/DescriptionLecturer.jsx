import React, { useState } from 'react'
import './DescriptionLecturer.css'
import { assets } from '../../assets/assets'
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const DescriptionLecturer = () => {
    const { id } = useParams();
    const [lecturer, setLecturer] = useState(null);

    useEffect(() => {
    axios.get(`http://localhost/backend_consult/api/lecturerDetails.php?id=${id}`)
    .then(res => {
      setLecturer(res.data);
    })
    .catch(err => console.log(err));
  }, [id]);

    return (
        <div className="page-container">
            <Link to="/lecturerslist"><img src={assets.back_icon} alt="" /></Link>
            {/* Profile Card Section */}
            <section className="profile-hero">
                <div className="profile-info">
                <h2>{lecturer?.name}</h2>
                <div className="avatar-placeholder">
                    {/* Image would go here */}
                </div>
                <div className='colour'>   
                    <div className="info-item">
                    <span className="icon"><img src={assets.world_icon}/></span> {lecturer?.languages?.join(", ")}
                    </div>
                    <div className="info-item">
                    <span className="icon"><img src={assets.award_icon}/></span> Licensed & Registered Counsellor under Lembaga Kaunselor Malaysia
                    </div>
                </div>
                </div>
            </section>
        
            <section className="about-section">
                <h3>About me</h3>
                <p>{lecturer?.description}</p>
            </section>
            <div className="button-group">
                <Link to="./clientform"><button className="action-btn">Book a session by form</button></Link>
                <button className="action-btn">Book a session by AI</button>
            </div>
        </div>
    )
}

export default DescriptionLecturer