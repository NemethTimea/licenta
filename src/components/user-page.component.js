import React, { Component } from 'react';
import Navbar from "./navbar.component";
import { Link } from 'react-router-dom';
import { getUserSvg, getAddUserSvg, getBackWhite, getLike, getComment } from "../other/svgFunctions";
import axios from 'axios';
import img from "../images/cover.jpg";
import img1 from "../images/butterfly.PNG";
import img2 from "../images/minirobot.PNG";
import img3 from "../images/building.PNG";
import img4 from "../images/Christmas.PNG";
import img5 from "../images/lamp.PNG";

export default class UserPage extends Component{
    constructor(props){
        super(props);
        console.log("idk");
    }
   
    render(){
        return (
            <div>
                <Navbar/>
                <div className="user-side"> 
                    <Link to={{
                            pathname: "/",
                    }}>
                    <p className="back">{getBackWhite(30, 30, "black")}</p>
                    </Link>
                    <img className="cover-image" src={img}/>
                    {getUserSvg(60, 60, "person-icon")}
                    <div className="middle-user-side">
                        <h2>User Full Name</h2> 
                        <button className="add-button">
                            Add
                            {getAddUserSvg()}
                        </button>
                    </div>
                    <div className="follow-post">
                        <p>Followers: 123</p>
                        <p>Follows: 50</p>
                        <p>Posts: 3</p>
                    </div>
                </div>
                <div className="middle_div_enum_products">
                    <div>
                        <div className="user_who_posted">
                            <p>User - Post title</p>
                        </div>
                        <div>
                            <Link to={{
                                pathname: "/details"
                            }}><img className="modelimage" src={img1}/></Link>
                        </div>
                        <div className="functionalities">
                            <div className="like">
                                {getLike()}
                                <p>Like</p>
                            </div>
                            <div className="comment">
                                {getComment()}
                                <p>Comment</p>
                            </div>
                        </div>  
                        <Link to={{
                            pathname: "/details",
                            state: {
                                user: null
                            }
                        }}><button className="button_details">Details</button></Link>
                    </div>
                    <div>
                        <div className="user_who_posted">
                            <p>User - Post title</p>
                        </div>
                        <div>
                            <Link to={{
                                pathname: "/details"
                            }}><img className="modelimage" src={img2}/></Link>
                        </div>
                        <div className="functionalities">
                            <div className="like">
                                {getLike()}
                                <p>Like</p>
                            </div>
                            <div className="comment">
                                {getComment()}
                                <p>Comment</p>
                            </div>
                        </div>  
                        <Link to={{
                            pathname: "/details"
                        }}><button className="button_details">Details</button></Link>
                    </div>
                    <div>
                        <div className="user_who_posted">
                            <p>User - Post title</p>
                        </div>
                        <div>
                            <Link to={{
                                pathname: "/details"
                            }}><img className="modelimage" src={img3}/></Link>
                        </div>
                        <div className="functionalities">
                            <div className="like">
                                {getLike()}
                                <p>Like</p>
                            </div>
                            <div className="comment">
                                {getComment()}
                                <p>Comment</p>
                            </div>
                        </div>  
                        <Link to={{
                            pathname: "/details"
                        }}><button className="button_details">Details</button></Link>
                    </div>
                    <div>
                        <div className="user_who_posted">
                            <p>User - Post title</p>
                        </div>
                        <div>
                            <Link to={{
                                pathname: "/details"
                            }}><img className="modelimage" src={img4}/></Link>
                        </div>
                        <div className="functionalities">
                            <div className="like">
                                {getLike()}
                                <p>Like</p>
                            </div>
                            <div className="comment">
                                {getComment()}
                                <p>Comment</p>
                            </div>
                        </div>  
                        <Link to={{
                            pathname: "/details"
                        }}><button className="button_details">Details</button></Link>
                    </div>
                </div>
                <div className="middle_div_enum_products">
                    <div>
                        <div className="user_who_posted">
                            <p>User - Post title</p>
                        </div>
                        <div>
                            <Link to={{
                                pathname: "/details"
                            }}><img className="modelimage" src={img5}/></Link>
                        </div>
                        <div className="functionalities">
                            <div className="like">
                                {getLike()}
                                <p>Like</p>
                            </div>
                            <div className="comment">
                                {getComment()}
                                <p>Comment</p>
                            </div>
                        </div>  
                        <Link to={{
                            pathname: "/details"
                        }}><button className="button_details">Details</button></Link>
                    </div>
                </div><br/><br/>
            </div>
        )
    }
}