import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Aboutus from '../aboutus/aboutus'
import Services from '../Services/Services'
import Faqs from '../FAQs/Faqs'

const Home = () => {
  return (
    <div>
      <Header/>
      <Aboutus/>
      <Services/>
      <Faqs/>
    </div>
  )
}

export default Home