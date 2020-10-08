import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom'
import SmhsLogo from "../images/Smhs_Logo.png";


const Navbar = (props) => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <div className="nav-left">
        <Link className="brand-logo" to="/">
        <img src={SmhsLogo} alt="Samvardhana Motherson" className="head-logo" />
        </Link>
        </div>
        <div className="nav-center">
        <ul >
          <li><NavLink exact to="/home" className="links" activeClassName="activeLink">Dashboard</NavLink></li>
          <li><NavLink to='/hospital'  className="links" activeClassName="activeLink">All Hospitals</NavLink></li>
          <li><NavLink to='/doctors'  className="links" activeClassName="activeLink"> Doctor's</NavLink></li>
          <li><NavLink to='/patient'  className="links" activeClassName="activeLink">Patients</NavLink></li>
          <li><NavLink to='/contact'  className="links" activeClassName="activeLink">Contact</NavLink></li>
        </ul>
        </div>
        <div className="nav-right"> <Link to="/splash" className="logoutbtn">Log Out</Link> </div>
      </div>
    </nav> 
  )
}

export default withRouter(Navbar)