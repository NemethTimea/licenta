import React, { Component } from 'react';
import { getUserSvg, getCreatePostSvg, getExplore, getLoginSvg, getList, getSearch } from "../other/svgFunctions";
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
            <div className="icon-navbar-container">
                <div className="icon-word-space">
                    {getUserSvg()}
                    <Link to={{
                      pathname: "/userpage"
                    }}>User name</Link>
                </div>
                <div className="icon-word-space">
                    {getCreatePostSvg()}
                    <Link to={{
                      pathname: "/createpost"
                    }}>Create post</Link>
                </div>
                <div className="dropdown">
                    {getExplore()} 
                    <Link to={{
                      pathname: "/explore"
                    }}>Explore</Link>
                </div>
                <div className="icon-word-space">
                    {getLoginSvg()}
                    <Link to={{
                      pathname: "/login"
                    }}>Login</Link>
                </div>
                <div>
                    {getList()}
                </div>
            </div>
        </nav>
      </div>
    );
  }
}