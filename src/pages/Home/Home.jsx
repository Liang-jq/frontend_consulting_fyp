import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Aboutus from '../aboutus/aboutus'
import Services from '../Services/Services'
import Faqs from '../FAQs/Faqs'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <Aboutus/>
      <Services/>
      <Faqs/>
    </div>
  )
}

export default Home