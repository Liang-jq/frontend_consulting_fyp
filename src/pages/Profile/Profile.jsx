import React, { useEffect, useState } from 'react'
import './Profile.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const id = user?.id

        axios.get(`http://localhost/backend_consult/api/getProfile.php?id=${id}`)
        .then(res=>{
            setUser(res.data);
        })
    }, [])

    if(!user){
        return <p>Loading...</p>
    }

    return (
        <div className="page-container">
            <div className="profile-header">
                <div className="image-container">
                    <img src={user.profilepic || "/default-avatar.png"} alt="Profile" className="main-avatar" />
                </div>
                <h1>{user.name}</h1>
            </div>

            <div className="detail-card">
                <h2>Detail</h2>
                <div className="info-group">
                    <label>Email (Gmail)</label>
                    <p>{user.email}</p>
                </div>
                <div className="info-group">
                    <label>Matric Number</label>
                    <p>{user.matric_number||"-"}</p>
                </div>
                <div className="info-group">
                    <label>Phone Number</label>
                    <p>{user.phone||"-"}</p>
                </div>
                <div className="info-group">
                    <label>Year</label>
                    <p>{user.year||"-"}</p>
                </div>
            </div>
            <div className="actions">
               <Link to="/editcounsellor"><button className="edit-profile-btn">Edit Profile</button></Link>
            </div>
        </div>
    )
}

export default Profile