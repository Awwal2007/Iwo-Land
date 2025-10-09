import React, { useRef } from 'react';
import './css/Header.css'
import { Link, useLocation } from 'react-router-dom';

import Clock from "../components/Clock";
import backgroundImage from '../assets/Gold Background2.jpg'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { TiHome } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";

const Header = () => {
    const detailsRef = useRef(null);
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath === path ? 'button active' : 'button';
    
    const handleLinkClick = () => {
        if (detailsRef.current) {
            detailsRef.current.open = false; // close the <details>
        }
    };

    
    return (
        <>
        <header className='header-container'>
            <div className='clock-container'>
                <Clock/>
            </div>
            <div style={{background: `url(${backgroundImage})`, objectFit: "unset", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className='kingdom-name' >
                <h2 style={{marginBottom: "10px", fontSize: "35px"}}>Iwo Land</h2>
                <p>"The child who listens to prospers"</p>
            </div>
            <div className='nav-bar'>
                <div className='desktop-nav'>
                    <div><Button component={Link} to='/' className='button active'><TiHome size={28} /></Button></div>
                    <div><Button component={Link} to='/' className={isActive('/')}>Home</Button></div>
                    {/* <div><Button component={Link} to='/oluwo' className={isActive('/oluwo')}>OLUWO OF IWO LAND</Button></div> */}
                    {/* <div><Button component={Link} to='/iwo-land' className={isActive('/iwo-land')}>Iwo Land</Button></div> */}
                    <div><Button component={Link} to='/blogs' className={isActive('/blogs')}>Blogs</Button></div>
                    <div><Button component={Link} to='/gallery' className={isActive('/gallery')}>Gallery</Button></div>
                    {/* <div style={{ flex: "1" }}><Button component={Link} to='/resources' className={isActive('/resources')}>RESOURCES AND HELP</Button></div> */}
                    {/* <div className='search-button'><FaSearch size={18} /></div> */}
                </div>

                <div className='mobile-nav'>
                    <details ref={detailsRef}>
                    <summary>☰ Menu</summary>
                    <div className='mobile-menu'>
                        <Button component={Link} to='/' className={isActive('/')} onClick={handleLinkClick}><TiHome size={24} /> Home</Button>
                        {/* <Button component={Link} to='/oluwo' className={isActive('/oluwo')} onClick={handleLinkClick}>OLUWO OF IWO LAND</Button> */}
                        {/* <Button component={Link} to='/iwo-land' className={isActive('/iwo-land')}>Iwo Land</Button> */}
                        <Button component={Link} to='/blogs' className={isActive('/blogs')} onClick={handleLinkClick}>Blogs</Button>
                        <Button component={Link} to='/gallery' className={isActive('/gallery')} onClick={handleLinkClick}>Gallery</Button>
                        {/* <Button component={Link} to='/resources' className={isActive('/resources')}>RESOURCES AND HELP</Button> */}
                    </div>
                    </details>
                </div>
            </div>
        </header>
        </>
    );
}


export default Header