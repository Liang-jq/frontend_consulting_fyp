import React from 'react'
import './SidebarAdmin.css'
import ConnectCalendar from '../ConnectCalendar/ConnectCalendar'
import { NavLink } from 'react-router-dom'

const SidebarAdmin = () => {
  return (
    <div className="sidebar">
      <NavLink to="/admindashboard" className="sidebar-item">Dashboard</NavLink>
      <NavLink to="/adminapp" className="sidebar-item">List of Session</NavLink>
      <NavLink to="/listofstudent" className="sidebar-item">List of Student</NavLink>
      <ConnectCalendar><div className="sidebar-item">Connect Google Calendar</div></ConnectCalendar>
    </div>
  )
}

export default SidebarAdmin