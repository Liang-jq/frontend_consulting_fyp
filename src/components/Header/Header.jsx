import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>You don't have to face this alone.</h2>
            <p>Book a slot with our counselling</p>
            <Link to="/lecturerslist"><button>With Lecturers</button></Link>
            <Link to="/traineelist"><button>With Trainee Counselling</button></Link>
        </div>
        <div className="image-connselling">
            <img src={assets.homepage_icon} alt="" />
        </div>
    </div>
  )
}

export default Header