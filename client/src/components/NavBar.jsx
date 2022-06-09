import React from "react";
import { Link } from "react-router-dom";
import logo from '../img/diet.png';
import ButtonLogout from './ButtonLogout';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light static-top mb-0 shadow" style={{ backgroundColor: "#cd9dc7" }}>
      <div className="container">
        
        <div className="navbar-brand primero">
          <Link to="/">
            <img alt="Logo" src={logo} width="70" height="70"/>
          </Link>
        </div>

        <div className="navbar-brand segundo"></div>

        <div className="navbar-brand tercero">
          <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/search" style={{fontSize: "0.2rem",color: "white"}}>
                  <button type="button" className="btn btn-warning" style={{backgroundColor: "#805573",borderColor:"#805573"}}>Search</button>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/detalle" style={{fontSize: "0.2rem",color: "white"}}>
                  <button type="button" className="btn btn-warning" style={{backgroundColor: "#8665A3",borderColor:"#8665A3"}}>Stats</button>
                </Link>
            </li>
            <li className="nav-item">
                <ButtonLogout />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;