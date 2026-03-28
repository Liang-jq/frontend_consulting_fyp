import React, { useEffect, useState } from 'react'
import './DescriptionCounsellor.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const DescriptionCounsellor = () => {
  const { id } = useParams();
  const [counsellor, setCounsellor] = useState();

  useEffect(() => {
    axios.get(`http://localhost/backend_consult/api/counsellorDetails.php?id=${id}`)
    .then(res => {
      setCounsellor(res.data);
    })
    .catch(err => console.log(err));
  }, [id]);

  if (!counsellor) {
  return <p>Loading...</p>;
}
  return (
    <div>
      <Navbar/>
    <div className="page-container">
      
      <Link to="/traineelist"><img src={assets.back_icon} alt="" /></Link>
      {/* Profile Card Section */}
      <section className="profile-hero">
        <div className="profile-info">
          <h2>{counsellor.name}</h2>
          <div className="avatar-placeholder">
            {/* Image would go here */}
          </div>
          <div className='colour'>   
            <div className="info-item">
              <span className="icon"><img src={assets.world_icon}/></span> {counsellor?.languages?.join(", ")}
            </div>
            <div className="info-item">
              <span className="icon"><img src={assets.award_icon}/></span> Student bachelor of Counselling UNIMAS
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h3>About me</h3>
        <p>{counsellor.description}</p>
      </section>
      <div className="button-group">
        <Link to={`/clientform/${counsellor.id}`}><button className="action-btn">Book a session by form</button></Link>
        <Link to={`/chatbot/${counsellor.id}`}><button className="action-btn">Book a session by AI</button></Link>
      </div>
    </div>
  </div>
  )
}

export default DescriptionCounsellor