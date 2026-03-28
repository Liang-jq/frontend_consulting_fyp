import React, { useEffect } from 'react'
import './CounsellorDashboard.css'
import SidebarCounsellor from '../../components/SidebarCounsellor/SidebarCounsellor'
import { assets } from '../../assets/assets'
import { useLocation, useNavigate } from 'react-router-dom'
import CounNavbar from '../../components/CounNavbar/CounNavbar'

const CounsellorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if URL has calendar=connected parameter
    const params = new URLSearchParams(location.search);
    if (params.get('calendar') === 'connected') {
      toast.success('Google Calendar connected successfully! 📅');
      // Clean up URL
      navigate('/counsellordashboard', { replace: true });
    }
  }, [location, navigate]);
  
  return (
    <div className='body'>
      <CounNavbar/>
      <div className="dashboard-layout">
        <SidebarCounsellor />
        <div className="main-content">
          <div className="summary-cards">
            <div className="summary-header-text">
              <h2>Dashboard</h2>
              <p className="breadcrumb">Session Summary</p>
            </div>
            <div className="cards-row">
              <div className="card blue">
                <img src={assets.groupuser_icon} alt="group" />
                <h3>12</h3>
                <p>Total Group Session</p>
              </div>
              <div className="card pink">
                <img src={assets.client_icon} alt="individual" />
                <h3>12</h3>
                <p>Total Individual Session</p>
              </div>
              <div className="card purple">
                <img src={assets.session_icon} alt="total" />
                <h3>24</h3>
                <p>Total Number Session</p>
              </div>
            </div>
          </div>

            {/* Charts Section */}
          <div className="charts-container">
            <div className="chart-box">
              <h3>Summary Session</h3>
              {/* Insert Line Chart Component here */}
            </div>
            <div className="chart-box">
              <h3>Summary Total Session of Month</h3>
              {/* Insert Bar Chart Component here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CounsellorDashboard