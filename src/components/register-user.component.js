import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getBackWhite, getHouse, getEmail, getPassword, getUserSvg, getComment, getPrinter, getBackSvg } from "../other/svgFunctions";
import { Button } from 'react-bootstrap';
import axios from "axios";

export default class Register extends Component{
    constructor(props){
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onChangeAbout = this.onChangeAbout.bind(this);
        this.onChangeHasPrinter = this.onChangeHasPrinter.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            about: '',
            printer: false,
            registered: false
        }
    }
    
    onChangeFirstName(e){
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLastName(e){
        this.setState({
            lastname: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangePwd(e){
        this.setState({
            password: e.target.value
        })
    }

    onChangeAbout(e){
        this.setState({
            about: e.target.value
        })
    }

    onChangeHasPrinter(e){
        this.setState({
            printer: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const item = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            about: this.state.about,
            printer: this.state.printer
        }

        axios.post("http://localhost:5111/users/register/user/", item)
            .then(response => {
                this.setState({
                    registered: true
                })
            })
            .catch((err) => {
                if (err.response){
                    console.log(err.response);
                }
                else if(err.request){
                    console.log(err.request);
                }
                else if(err.message){
                    console.log(err.message);
                }
            });
    }

    render(){
        return this.state.registered ? <Redirect to={{
            pathname: `/login/simple`,
            state: {
                login: "login",
                user: this.state.user
            }
        }}/> : (
            <div>
                <p className="title-signin"><b>Sign Up</b> form</p><br/>
                <div className="register-container">
                    <div className="register-text-container">
                        <br/><br/><br/>
                        <p><b>Welcome!</b> <br/><br/> Nice to meet you, costumer! <br/> Complete the data form to create an account. Let's begin your <b>"3D Vision"</b> experience! </p>
                        <div className="back-home-icons">
                            <Link to={{
                                pathname: "/login/simple",
                                state:{
                                    login: "login",
                                    user: this.state.user
                                }
                            }}>{getBackWhite(22,22,"white")}</Link>
                        </div>
                    </div>
                    <div className="register-form-container">
                        <form onSubmit={this.onSubmit}><br/>
                            <div className="form-group">
                                <label className="label-register-align">Firstname </label><br/>
                                <input
                                    type="text"
                                    name="firstname"
                                    required
                                    onChange={this.onChangeFirstName}
                                    className="form-input"/>
                            </div>
                            <div className="form-group">
                                    <label className="label-register-align">Lastname </label><br/>
                                    <input
                                        type="text"
                                        name="lastname"
                                        required
                                        onChange={this.onChangeLastName}
                                        className="form-input"/>
                                </div>
                            <div className="form-group">
                                <label className="label-register-align">{getUserSvg()} Username </label><br/>
                                <input
                                    type="text"
                                    name="username"
                                    minLength="4"
                                    required
                                    onChange={this.onChangeUserName}
                                    className="form-input"/>
                            </div>
                            <div className="form-group">
                                <label className="label-register-align">{getEmail()} Email </label><br/>
                                <input
                                    type="text"
                                    name="email"
                                    required
                                    onChange={this.onChangeEmail}
                                    className="form-input"/>
                            </div>
                            <div className="form-group">
                                <label className="label-register-align">{getPassword()} Password </label><br/>
                                <input
                                    type="password"
                                    name="pwd"
                                    required
                                    minLength="4"
                                    onChange={this.onChangePwd}
                                    className="form-input"/>
                            </div>
                            <div className="form-group">
                                    <label className="label-register-align">{getComment()}About </label><br/>
                                    <input
                                        type="text"
                                        name="abput"
                                        required
                                        onChange={this.onChangeAbout}
                                        className="form-input"/>
                            </div><br/>
                            <div className="form-group">
                                <label className="label-align">Do you have a 3D printer? </label><br/>
                                <input
                                    type="checkbox"
                                    name="printer"
                                    onChange={this.onChangeHasPrinter}
                                    className="print-align"/>
                                    {getPrinter()}
                            </div><br/>
                            <Button
                                type="submit"
                                className="register-submit"
                                value="Create Account">Register!
                            </Button><br/><br/>
                        </form> 
                    </div>
                </div>
            </div>
        )
    }
}