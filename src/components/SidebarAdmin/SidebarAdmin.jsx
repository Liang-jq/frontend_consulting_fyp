import React from 'react'
import './SidebarAdmin.css'
import ConnectCalendar from '../ConnectCalendar/ConnectCalendar'
import { NavLink } from 'react-router-dom'

const SidebarAdmin = () => {
  return (
    <div className="sidebar">
      <NavLink to="/admindashboard" className="sidebar-item">Dashboard</NavLink>
      <div className="sidebar-item">List of Session</div>
      <NavLink to="/listofstudent" className="sidebar-item">List of Student</NavLink>
      <ConnectCalendar><div className="sidebar-item">Connect Google Calendar</div></ConnectCalendar>
    </div>
  )
}

export default SidebarAdmin