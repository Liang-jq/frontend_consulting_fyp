import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Loginuser from './pages/Loginuser/Loginuser'
import Lecturerlist from './pages/Lecturerlist/Lecturerlist'
import Registeruser from './pages/Registeruser/Registeruser'
import Registercounsellor from './pages/Registercounsellor/Registercounsellor'
import Forgetpassword from './pages/Forgetpassword/Forgetpassword'
import Clientform from './pages/Clientform/Clientform'
import Traineelist from './pages/Traineelist/Traineelist'
import CounsellorDashboard from './pages/CounsellorDashboard/CounsellorDashboard'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import Listofstudent from './pages/Listofstudent/Listofstudent'
import AdminRegister from './pages/AdminRegister/AdminRegister'
import DescriptionCounsellor from './pages/DescriptionCounsellor/DescriptionCounsellor'
import DescriptionLecturer from './pages/DescriptionLecturer/DescriptionLecturer'


const App = () => {
  const [showLogin,setShowLogin]=useState(false)

  return (
    <>
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/loginuser' element={<Loginuser/>}/>
          <Route path='/lecturerslist' element={<Lecturerlist/>}/>
          <Route path='/registeruser' element={<Registeruser/>}/>
          <Route path='/registercounsellor' element={<Registercounsellor/>}/>
          <Route path='/forgetpassword' element={<Forgetpassword/>}/>
          <Route path='/clientform' element={<Clientform/>}/>
          <Route path='/traineelist' element={<Traineelist/>}/>
          <Route path='/counsellordashboard' element={<CounsellorDashboard/>}/>
          <Route path='/admindashboard' element={<AdminDashboard/>}/>
          <Route path='/listofstudent' element={<Listofstudent/>}/>
          <Route path='/adminregister' element={<AdminRegister/>}/>
          <Route path='/descriptioncounsellor/:id' element={<DescriptionCounsellor/>}/>
          <Route path='/descriptionlecturer/:id' element={<DescriptionLecturer/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App