import React, { Component } from 'react';
import { getUserSvg, getCreatePostSvg, getExplore, getLoginSvg, getList } from "../other/svgFunctions";
import { Link } from 'react-router-dom';
import logo from "../images/logo.png";

export default class Navbar extends Component {

  render() {
    return (
      <div>

      <nav className="shared_navbar">
          <Link 
            to={{
              pathname: "/"
            }}>
              <img className="logo" src={logo}></img></Link>
          <div>
              <div>
                  {getUserSvg()}
                  <Link to={{
                    pathname: "/"
                  }}>User name</Link>
              </div>
              <div>
                  {getCreatePostSvg()}
                  <Link to={{
                    pathname: "/"
                  }}>Create post</Link>
              </div>
              <div className="dropdown">
                  {getExplore()} 
                  <Link to={{
                    pathname: "/"
                  }}>Explore</Link>
                  <div className="dropdown-content">
                      <p>Users</p>
                      <p>Products</p>
                  </div>
              </div>
              <div>
                  {getLoginSvg()}
                  <Link to={{
                    pathname: "/"
                  }}>Login</Link>
              </div>
              <div>
                  {getList()}
              </div>
          </div>
      </nav>
      <nav className="menubar">
            <div>
                <p>Art</p>
            </div>
            <div>
                <p>Engineering</p>
            </div>
            <form id="search_engine" action="">
                <input type="text" placeholder="Search.." name="search"/>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </form>
            <div>
                <p>Animals</p>
            </div>
            <div>
                <p>Buildings & Structures</p>         
            </div>
        </nav>
      </div>
    );
  }
}