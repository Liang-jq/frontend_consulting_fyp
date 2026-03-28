import React from 'react'
import './SidebarCounsellor.css'
import { NavLink } from 'react-router-dom'

const SidebarCounsellor = () => {
  const connectGoogle = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const counsellor_id = storedUser?.counsellor_id;

    window.location.href = `http://localhost/backend_consult/api/googleAuth.php?counsellor_id=${counsellor_id}`;
  }
  return (
    <div className="sidebar">
      <NavLink to="/counsellordashboard" className="sidebar-item">Dashboard</NavLink>
      <NavLink to="/counsellorapp" className="sidebar-item">List of session</NavLink>
      <div className="sidebar-item" onClick={connectGoogle}>Connect Google Calendar</div>
    </div>
  )
}

export default SidebarCounsellor