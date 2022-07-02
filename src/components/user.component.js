import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUserSvg } from "../other/svgFunctions";
import img from "../images/cover.jpg";

class User extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="user-container">
                <div>
                    {this.props.user.firstname + " " + this.props.user.lastname}
                </div>
                <div className="user-image">
                <div className="user-user-side">
                    <img className="user-user-side-image" src={img}/>
                    <div className="user-user-side-icon">{getUserSvg(60, 60)}</div>
                </div>
                </div>
                <div className="user-go-to-profile">
                    <Link className="user-go-to-profile-link" to={{
                            pathname: "/userpage",
                            state: {
                                "visitor": this.props.visitor,
                                "owner": this.props.user.username
                            }}}>
                        <button className="button_details">Go To Profile</button>
                    </Link>
                </div>
            </div>
        )
    }
}
export {
    User
}
