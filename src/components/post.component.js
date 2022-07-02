import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { getLike, getComment, getUserSvg } from  "../other/svgFunctions";

class Post extends Component {
    constructor(props){
        super(props);
        this.path_images = "http://localhost:3000/uploads/images/"
        this.state = {
            user: this.props.user,
            post: this.props.post,
        }
    }
    render() {
        return (
            <div className="product-item">
                <div className="user_who_posted_sizeing">
                    <div className="user_who_posted">
                        {getUserSvg()}
                        <Link to={{
                            pathname: "/userpage",
                            state: {
                            "visitor": this.state.user,
                            "owner": this.state.post.owner,
                            }
                        }}>
                        <p className="owner-username-style">{this.state.post.owner}</p></Link>
                    </div>
                </div>
                <div>
                    <Link to={{
                            pathname: "/details",
                            state: {
                                user: this.state.user,
                                post_id: this.state.post._id
                            }
                    }}>
                        <img className="modelimage" src={this.path_images  + this.state.post.imagename} alt="Missing"/> 
                    </Link>
                </div>
                <div className="post-title">{this.state.post.title}</div>
                <div className="details-button-container">
                    <Link to={{
                        pathname: "/details",
                        state: {
                            user: this.state.user,
                            post_id: this.state.post._id
                        }}}>
                        <button className="button_details">Details</button>
                    </Link>
                </div>
            </div>
        )}
    }
export {
    Post
}
