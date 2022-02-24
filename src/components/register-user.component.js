import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getBackWhite, getHouse, getEmail, getPassword, getUserSvg, getComment, getPrinter, getBackSvg } from "../other/svgFunctions";
import { Button } from 'react-bootstrap';

export default class Register extends Component{
    constructor(props){
        super(props);
        console.log("register");
    }
   
    render(){
        return (
            <div>
                <p className="title-signin"><b>Sign Up</b> form</p><br/>
                <div className="register-container">
                    <div className="register-text-container">
                        <br/><br/><br/>
                        <p><b>Welcome!</b> <br/><br/> Nice to meet you, costumer! <br/> Complete the data form to create an account. Let's begin your <b>"3D Vision"</b> experience! </p>
                        <div className="back-home-icons">
                            <Link to={{
                                pathname: "/login",
                            }}>{getBackWhite(22,22,"white")}</Link>
                            <Link to={{
                                pathname: "/",
                            }}>{getHouse()}</Link>
                        </div>
                    </div>
                    <div className="register-form-container">
                        <form encType="multipart/form-data" className="form"><br/>
                            <div className="form-group">
                                <label className="label-register-align">Firstname </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group">
                                    <label className="label-register-align">Lastname </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"/>
                                </div>
                            <div className="form-group">
                                <label className="label-register-align">{getUserSvg()} Username </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group">
                                <label className="label-register-align">{getEmail()} Email </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group">
                                <label className="label-register-align">{getPassword()} Password </label><br/>
                                <input
                                    type="password"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group">
                                    <label className="label-register-align">{getComment()}About </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"/>
                            </div><br/>
                            <div className="form-group">
                                <label className="label-align">Do you have a 3D printer? </label><br/>
                                <input
                                    type="checkbox"
                                    required
                                    className="print-align"/>
                                    {getPrinter()}
                            </div><br/>
                            <Button
                                type="submit"
                                className="register-submit"
                                value="SignIn">Register!
                            </Button><br/><br/>
                        </form> 
                    </div>
                </div>
            </div>
        )
    }
}