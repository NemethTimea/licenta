import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSearch, getLike, getComment, getBackWhite, getExplore} from "../other/svgFunctions";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import img1 from "../images/butterfly.PNG";
import img2 from "../images/minirobot.PNG";
import img3 from "../images/building.PNG";
import img4 from "../images/Christmas.PNG";
import img5 from "../images/lamp.PNG";


export default class Explore extends Component{
    constructor(props){
        super(props);
        console.log("idk");
    }
   
    render(){
        return (
            <div>
                <div className="explore-container">
                    <Link to={{
                                pathname: "/",
                        }}>
                    <p className="back">{getBackWhite(30, 30, "white")}</p>
                    </Link>
                    <h3 className="align-top">Explore with <b><i>3D Vision</i></b></h3>
                    <p>You can search for any model you want and try the filters below!</p>
                    <p>{getExplore(32,32)}</p>
                    <br/>
                    <form className="space-between-search" action="">
                        <input className="search-style" type="text" placeholder="Search..." name="search"/>
                        <Button
                            type="submit"
                            value="SignIn">{getSearch()}</Button>
                    </form>
                    <br/><br/>
                </div>
                <div className="filters-container"><br/>
                    <div className="filters">
                        <div className="form-group">
                            <input
                                type="checkbox"
                                required
                                className="print-align"/>
                                Animals
                        </div>
                        <div className="form-group">
                            <input
                                type="checkbox"
                                required
                                className="print-align"/>
                                Art
                        </div>
                        <div className="form-group">
                            <input
                                type="checkbox"
                                required
                                className="print-align"/>
                                Engineering
                        </div>
                        <div className="form-group">
                            <input
                                type="checkbox"
                                required
                                className="print-align"/>
                                Buildings&Structures
                        </div>
                    </div>
                    <div className="filters-second-row">
                        <div className="form-group">
                            <input
                                type="checkbox"
                                required
                                className="print-align"/>
                                have printer
                        </div>
                        <div className="form-group">
                            <input
                                type="checkbox"
                                required
                                className="print-align"/>
                                users
                        </div>
                        <div className="form-group">
                            <input
                                type="checkbox"
                                required
                                className="print-align"/>
                                models
                        </div>
                    </div><br/>
                </div>
                <div className="middle_div_enum_products margin-top">
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