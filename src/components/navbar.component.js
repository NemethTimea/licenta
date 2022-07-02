import React, { Component } from 'react';
import { getUserSvg, getCreatePostSvg, getExplore, getLoginSvg, getList, getSearch, getLogoutSvg } from "../other/svgFunctions";
import { Link } from 'react-router-dom';
import logo from "../images/logo.png";

function userCreatePost(isLoggedIn, user){
  if (isLoggedIn){
    return <div className="icon-word-space-login">
      {getCreatePostSvg()}
      <Link to={{
          pathname: "/createpost",
          state: user
      }}><p className="shared-navbar-style">Create Post</p></Link>
    </div>
  }
}
function doNothing() {}
const NavBar = props => (
  <div>
    <nav id="shared_navbar">
      <Link to={{
            pathname: "/",
            state: props.user
          }}>
          <img className="logo" src={logo}></img>
      </Link>
      <div className="icon-navbar-container">
        <div className="icon-word-space">
            {props.userIcon}
            <Link to={{
              pathname: "/userpage",
              state: {
                "visitor": props.user,
                "owner": props.user ? props.user.username : "",
              }
            }} onClick={props.callback ? props.callback : doNothing}><p className="shared-navbar-style">{props.username}</p></Link>
        </div>
        <div className="dropdown">
            {getExplore()} 
            <Link to={{
              pathname: "/explore",
              state: {
                "visitor": props.user
              }
            }}><p className="shared-navbar-style">Explore</p></Link>
        </div>
        {props.create_post}
        <div className="icon-word-space-login">
            {props.loginIcon}
            <Link to={{
              pathname: "/login/simple",
              state: props.state
            }}><p className="shared-navbar-style">{props.login}</p></Link>
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
          <input type="text" placeholder="Search.." name="search"/>
          {/* {getSearch()} */}
      <div>
          <p>Animals</p>
      </div>
      <div>
          <p>Buildings & Structures</p>         
      </div>
    </nav>
  </div>
)

function showNavbar(user, callback){
  if (user !== undefined && user !== null && user !== "" && user !== 0 && user !== {} && user.firstname !== undefined){
    return  <NavBar user={user} username={user.firstname + " " + user.lastname} state={{login: "logout"}} login={"Logout"} userIcon={getUserSvg()} loginIcon={getLogoutSvg()} create_post={userCreatePost(true, user)} callback={callback}/>
  }
  return  <NavBar user={undefined} username={""} state={{login: "login"}} login={"Login"} userIcon={""} loginIcon={getLoginSvg()} create_post={userCreatePost(false)}/>
}

export {
  showNavbar
}