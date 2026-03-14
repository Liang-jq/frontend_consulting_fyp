import React, { useEffect, useState } from 'react'
import './Traineelist.css'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Traineelist = () => {
    const [counsellor,setCounsellor]=useState([])
    const [search,setSearch]=useState("")

    useEffect(()=>{
        axios.get("http://localhost/backend_consult/api/traineelist.php")
        .then(res=>{
            setCounsellor(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    const filteredCounsellor = counsellor.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
    );
    
    return (
        <div className="container">
            <div className="search-container">
                <input type="text" placeholder="Search the Counsellor" className="search-input" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <button><img src={assets.search_icon} /></button>
            </div>

            <h2 className="section-title">Our Trainees</h2>

            <div className="lecturer-grid">
                {filteredCounsellor.map((doc) => (
                    <Link to={`/descriptioncounsellor/${doc.id}`} key={doc.id} className="lecturer-card">
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

export default Traineelist