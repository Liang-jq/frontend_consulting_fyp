import React, { useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Footer from "./components/Footer/Footer"
import Loginuser from "./pages/Loginuser/Loginuser"
import Lecturerlist from "./pages/Lecturerlist/Lecturerlist"
import Registeruser from "./pages/Registeruser/Registeruser"
import Registercounsellor from "./pages/Registercounsellor/Registercounsellor"
import Forgetpassword from "./pages/Forgetpassword/Forgetpassword"
import Clientform from "./pages/Clientform/Clientform"
import Traineelist from "./pages/Traineelist/Traineelist"
import CounsellorDashboard from "./pages/CounsellorDashboard/CounsellorDashboard"
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard"
import Listofstudent from "./pages/Listofstudent/Listofstudent"
import AdminRegister from "./pages/AdminRegister/AdminRegister"
import DescriptionCounsellor from "./pages/DescriptionCounsellor/DescriptionCounsellor"
import DescriptionLecturer from "./pages/DescriptionLecturer/DescriptionLecturer"
import Profile from "./pages/Profile/Profile"
import EditProfileCounsellor from "./pages/EditProfileCounsellor/EditProfileCounsellor"
import CounsellorApp from "./pages/CounsellorApp/CounsellorApp"
import AdminApp from "./pages/AdminApp/AdminApp"
import UserApp from "./pages/userApp/userApp"
import Chatbot from "./pages/Chatbot/Chatbot"
import Uploadexcel from "./pages/Uploadexcel/Uploadexcel"
import { ToastContainer } from "react-toastify"

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginuser" element={<Loginuser />} />
          <Route path="/lecturerslist" element={<Lecturerlist />} />
          <Route path="/registeruser" element={<Registeruser />} />
          <Route path="/registercounsellor" element={<Registercounsellor />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/clientform/:id" element={<Clientform />} />
          <Route path="/traineelist" element={<Traineelist />} />
          <Route path="/counsellordashboard" element={<CounsellorDashboard />}/>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/listofstudent" element={<Listofstudent />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/descriptioncounsellor/:id" element={<DescriptionCounsellor />}/>
          <Route path="/descriptionlecturer/:id" element={<DescriptionLecturer />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/editcounsellor" element={<EditProfileCounsellor />} />
          <Route path="/counsellorapp" element={<CounsellorApp />} />
          <Route path="/adminapp" element={<AdminApp />} />
          <Route path="/userapp" element={<UserApp/>}/>
          <Route path="/chatbot/:id" element={<Chatbot/>}/>
          <Route path="/excel" element={<Uploadexcel/>}/>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      </div>
      <Footer />
    </>
  )
}

export default App