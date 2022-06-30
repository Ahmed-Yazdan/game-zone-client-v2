import React, { useState } from 'react';
import "./NavbarCustom.css";
import { Link, NavLink } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faBars, faArrowRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons'

const NavbarCustom = () => {

    const { user, logOut } = useAuth();

    let count = 0;

    const handleIcon = () => {
        if (count % 2 == 0) {
            document.getElementById("yourMom").style.left = "0";
            document.querySelector(".nav").style.position = "fixed";
            count++
        }
        else {
            document.getElementById("yourMom").style.left = "-100%";
            document.querySelector(".nav").style.position = "relative";
            count++
        };
    }

    return (
        <div className='nav'>
            <label className='logo'>Game Zone</label>
            <ul id="yourMom">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/games">Games</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li>
                {
                    user?.email ?
                        <div>
                            <button id="logout" onClick={logOut}>Logout<FontAwesomeIcon style={{marginLeft:'5px'}} icon={faArrowRightToBracket} /></button>
                            <span style={{color:'white', margin:'0 5px', marginLeft:'15 px', fontSize:'1.1rem'}}><FontAwesomeIcon style={{marginRight:'5px'}} icon={faUser} />{user?.displayName}</span>
                        </div>
                        :
                        <Link to="/login">Login<FontAwesomeIcon style={{marginLeft:'5px'}} icon={faArrowRightToBracket} /></Link>

                }
                </li>
            </ul>
            <div onClick={handleIcon} id='icon' >
                <FontAwesomeIcon icon={faBars} />
            </div>
        </div>
    );
};

export default NavbarCustom;


// <i class="fa-solid "></i>