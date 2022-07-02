import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Checkbox } from 'pretty-checkbox-react';
import axios from "axios";

export default class CreateUser extends Component{
    constructor(props){
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAbout = this.onChangeAbout.bind(this);
        this.onChangePrinter = this.onChangePrinter.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            about: "",
            printer: false,
            registered: false
        }
    }

    onChangeFirstname(e){
        this.setState({
            firstname: e.target.value
        })
    }
    onChangeLastname(e){
        this.setState({
            lastname: e.target.value
        })
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    onChangeAbout(e){
        this.setState({
            about: e.target.value
        })
    }
    onChangePrinter(e){
        this.setState(yes => ({ ...yes, [e.target.value]: !yes[e.target.value] }))
    }
    onSubmit(e){
        e.preventDefault();

        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            about: this.state.about,
            printer: this.state.printer
        }

        axios.post("http://localhost:5111/users/add", data)
            .then(response => {
                this.setState({
                    registered: true
                })
            })
            .catch((error) => {
                if (error.response){
                    console.log(error.response);
                }
                else if(error.request){
                    console.log(error.request);
                }
                else if(error.message){
                    console.log(error.message);
                }
            });
        window.location = '/';
    }

    render(){
        return this.state.registered ? <Redirect to={{
            pathname: `/login/idk`,
            state: {
                login: "login",
                user: this.state.user
            }}}/> : (
            <div>
            <h3>Create New User</h3>
            <f tipul acesteia orm onSubmit={this.onSubmit} encType="multipart/form-data" >
              <div className="form-group"> 
                <label>Firstname: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.firstname}
                    onChange={this.onChangeFirstname}
                    />
              </div>
              <div className="form-group"> 
                <label>Lastname: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.lastname}
                    onChange={this.onChangeLastname}
                    />
              </div>
              <div className="form-group">
                <label>Username: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
              </div>
              <div className="form-group">
                <label>Email: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
              </div>
              <div className="form-group">
                <label>Password: </label>
                <input 
                    type="password"
                    maxLength="8"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
              </div>
              <div className="form-group">
                <label>About: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.about}
                    onChange={this.onChangeAbout}
                    />
              </div>
              <div>
                <Checkbox 
                    value={this.state.printer}
                    onChange={this.onChangePrinter}
                    >Printer</Checkbox>
              </div><br/>
              <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
              </div>
            </f>
        </div>
        )
    }
}