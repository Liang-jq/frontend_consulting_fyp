import React, { useEffect, useState } from 'react'
import './Lecturerlist.css'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Lecturerlist = () => {
  const [lecturers,setLecturers]=useState([])
  const [search,setSearch]=useState("")

  useEffect(()=>{
        axios.get("http://localhost/backend_consult/api/lecturerslist.php")
        .then(res=>{
            setLecturers(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    const filderedLecturers = lecturers.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="container">
      <div className="search-container">
          <input type="text" placeholder="Search the Counsellor" className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="search-btn"><img src={assets.search_icon} className='search'/></button>
      </div>

      <h2 className="section-title">Our Lecturers</h2>

      <div className="lecturer-grid">
        {filderedLecturers.map((doc) => (
          <Link to={`/descriptionlecturer/${doc.id}`} key={doc.id} className="lecturer-card">
            <div className="image-placeholder">
              {/* This would be <img src={doc.img} /> */}
            </div>
            <div className="card-info">
              <h3>{doc.name}</h3>
              <p className="title"><em>{doc.title}</em></p>
              <div className="languages">
                <p>Languages:</p>
                <ul>
                  {doc.languages.map((lang, i) => (
                    <li key={i}>{lang}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
          ))}
      </div>
    </div>   
  )
}

export default Lecturerlist