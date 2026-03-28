import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import './CounNavbar.css'

const CounNavbar = () => {
    const [menu, setMenu] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    const firstLetter = user?.name?.[0]?.toUpperCase();
    const handleLogout = () => {
        // Clear your session/token here
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setShowDropdown(false);
        window.location.href = "/loginuser";
    };

    return (
        <div className="navbar">
            <img src={assets.unimas_icon} className="logo" />
            <div className="navbar-links-group">
                <div className="navbar-right">
                {user ? (
                    <div className="profile-dropdown-container">
                    {/* Clicking this toggles the menu */}
                    <div className="profile-picture" onClick={() => setShowDropdown(!showDropdown)}>
                        {firstLetter}
                    </div>
                    {showDropdown && (
                        <ul className="nav-profile-dropdown">
                        <li onClick={() => navigate("/profile")}>
                            <p>Profile</p>
                        </li>
                        <hr />
                        <li onClick={handleLogout}>
                            <p>Logout</p>
                        </li>
                        </ul>
                    )}
                    </div>
                ) : (
                    <Link to="/loginuser"><button className="signin-btn">SIGN IN</button></Link>
                )}
                </div>
            </div>
        </div>
    )
}

export default CounNavbar