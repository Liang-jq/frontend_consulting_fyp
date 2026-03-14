import React from 'react'
import './Services.css'
import { assets } from '../../assets/assets'

const Services = () => {
  return (
    <div className='service' id='service'>
      <h2>Our Counselling Service</h2>
      <div className="service-list">
        <div className="service-card service-individual">
          <img src={assets.individualCounselling_icon} alt="" />
          <p>Individual Counselling</p>
        </div>
        <div className="service-card service-group">
          <img src={assets.groupCounselling_icon} alt=""/>
          <p>Group Counselling</p>
        </div>
      </div>
    </div>
  )
}

export default Services