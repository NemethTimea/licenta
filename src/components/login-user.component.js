import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getBackWhite, getEmail, getPassword } from "../other/svgFunctions";
import axios from 'axios';
import img1 from "../images/butterfly.PNG";
import { Button } from 'react-bootstrap';



export default class Login extends Component{
    constructor(props){
        super(props);
        console.log("idk");
    }
   
    render(){
        return (
            <div>
                <p className="title-signin"><b>Sign In</b> form</p><br/>
                <div className="sign-in-div">
                    <div className="sign-in-form">
                        <div className="legit-form"><br/>
                            <p className="hello"><b>Hello!</b></p>
                            <p className="sign-into">Sign into Your account</p>
                            <form encType="multipart/form-data" className="form">
                                <div className="input-style">
                                    <label>{getEmail()} Email </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"/>
                                </div>
                                <div className="form-group">
                                    <label>{getPassword()} Password </label><br/>
                                    <input
                                        type="password"
                                        required
                                        className="form-input-create"/>
                                </div><br/><br/>
                                <Button
                                    type="submit"
                                    className="button-signin"
                                    value="SignIn">Sign In!</Button>
                            </form> 
                        </div>
                    </div>
                    <div className="right-text">
                        <br/>
                        <p><b>Welcome Back!</b><br/><br/>If you signed in and have an account, join our creative world!</p>
                        <Link to={{
                            pathname: "/",
                        }}>{getBackWhite()}</Link>
                    </div>
                </div>
                <div className="bottom-text">
                    <p>I don't have an account.</p>
                    <Link className="link-color" to={{
                        pathname: "/register",
                    }}><u>Create one!</u></Link>
                </div>
            </div>
        )
    }
}