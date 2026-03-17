import React from 'react'
import './SidebarCounsellor.css'
import ConnectCalendar from '../ConnectCalendar/ConnectCalendar'
import { NavLink } from 'react-router-dom'

const SidebarCounsellor = () => {
  return (
    <div className="sidebar">
      <NavLink to="/counsellordashboard" className="sidebar-item">Dashboard</NavLink>
      <NavLink to="/counsellorapp" className="sidebar-item">List of session</NavLink>
      <ConnectCalendar><div className="sidebar-item">Connect Google Calendar</div></ConnectCalendar>
    </div>
  )
}

export default SidebarCounsellor