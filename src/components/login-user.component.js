import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getBackWhite, getEmail, getPassword } from "../other/svgFunctions";
import axios from 'axios';
import img1 from "../images/butterfly.PNG";
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const ConfirmEmail = props => (
    <div>
        <p class="please-confirm">Please confirm your email before you log in. Thanks!</p> 
    </div>
);

export default class Login extends Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.getNonConfirmedEmailDiv = this.getNonConfirmedEmailDiv.bind(this);
    
        this.state = {
            username: '',
            password: '',
            ready: {
                isSignedUp: false,
                user: {},
                triedLogin: false
            },
            logout: (this.props.location.state && this.props.location.state.login) ? this.props.location.state.login: "login",
            account_confirmation: this.props.match.params.token,
            confirmed: false
        }
    }
   
    componentDidMount(){
        if (this.state.logout === "logout"){
            localStorage.clear();
        }
        if (this.state.account_confirmation !== "simple"){
            axios.post("http://localhost:5111/users/confirm/", {ccode: this.state.account_confirmation})
                .then(() => {
                    this.setState({
                        account_confirmation: "confirmed"
                    });
                })
                .catch((err) => {console.log(err)});
        }
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

    onSubmit(e){
        e.preventDefault();
        const user ={
            username: this.state.username,
            password: this.state.password
        }
        axios.post("http://localhost:5111/users/login/user/", user)
            .then(response => {
                if (response.data !== "null" && response.data !== "error"){
                    this.setState({
                        ready: {
                            isSignedUp: response.data.status === "Active" ? true : false,
                            user: response.data.status === "Active" ? response.data : {},
                            triedLogin: true
                        },
                        confirmed: response.data.status === "Active" ? true : false
                    });
                }
            })
            .catch((err) => {
                if (err.response){
                    console.log(err.response);
                }
                else if (err.request){
                    console.log(err.request);
                }
                else if (err.message){
                    console.log(err.message);
                }
            });
    }
    getNonConfirmedEmailDiv(){
        if (this.state.ready.triedLogin){
            return <ConfirmEmail />
        }
    }

    render(){
        if (this.state.ready.isSignedUp && this.state.ready.user !== {}){
            return <Redirect to={{
                pathname: `/`,
                state: this.state.ready.user
            }}/>;
        }
        return (
            <div>
                <p className="title-signin"><b>Sign In</b> form</p><br/>
                {this.getNonConfirmedEmailDiv()}
                <div className="sign-in-div">
                    <div className="sign-in-form">
                        <div className="legit-form"><br/>
                            <p className="hello"><b>Hello!</b></p>
                            <p className="sign-into">Sign into Your account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="input-style">
                                    <label> Username </label><br/>
                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        required
                                        onChange={this.onChangeUserName}
                                        className="form-input"/>
                                </div>
                                <div className="form-group">
                                    <label>{getPassword()} Password </label><br/>
                                    <input
                                        type="password"
                                        name="pwd"
                                        required
                                        onChange={this.onChangePwd}
                                        className="form-input"/>
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
                            state:{
                                login: "login",
                                user: this.state.user
                            }
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