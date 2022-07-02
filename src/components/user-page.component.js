import React, { Component } from 'react';
import {showNavbar} from "./navbar.component";
import { Post } from "./post.component";
import { Follower } from "./follower.component";
import { Link, Redirect } from 'react-router-dom';
import { getUserSvg, getAddUserSvg, getBackWhite, getLike, getComment, getPrinter } from "../other/svgFunctions";
import axios from 'axios';
import img from "../images/cover.jpg";

function addButtonAppear(user){
    if (user === undefined && user === null && user === "" && user === 0 && user === {}){
      return <button className="add-button">
                Add
                {getAddUserSvg()}
            </button>
    }
}

function hasPrinterIconAppear(user){
    if (user.printer == true){
      return <p className="printer"> 
                {getPrinter(30, 30, "white")}
            </p>
    }
}

export default class UserPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            visitor: this.props.location.state ? this.props.location.state.visitor : null,
            owner_data: {posts: []},
            about: "",
            aboutDisplay: {},
            posts: [],
            followers: [],
            follows: [],
            editButtonStyle: {},
            visitorIsOwner: (this.props.location.state.visitor && this.props.location.state.visitor.username === this.props.location.state.owner) ?
            true : false,
            visitorIsOwnerStyle: (this.props.location.state.visitor && this.props.location.state.visitor.username === this.props.location.state.owner) ?
            {display: "flex"} : {display: "none"},
            oldScreenX: 0,
            oldScreenY: 0,

            followOwnerStyle: {},
            unfollowOwnerStyle: {}
        }

    }
    itemsList(){
        return this.state.owner_data.posts.map(post => {
            return <Post post={post} user={this.state.visitor} key={post._id} />
        })
    }

    favouritesList(){
        return this.state.owner_data.favourites.map(post => {
            return <Post post={post} user={this.state.visitor} key={post._id} />
        })
    }

    showAboutModal(){
        this.setState({ 
            aboutDisplay: { display: 'flex' } ,
            oldScreenX: window.scrollX,
            oldScreenY: window.scrollY
        }, () => {
            window.scrollTo(0,0);
            document.body.style.overflow = "hidden";
        });
    }

    showEditModal(){
        this.setState({
             editButtonStyle: { display: 'flex'},
             oldScreenX: window.scrollX,
             oldScreenY: window.scrollY
        }, () => {
            window.scrollTo(0,0);
            document.body.style.overflow = "hidden";
        });
    }

    hideAboutModal(){
        this.setState({ aboutDisplay: { display: 'none' } });
        document.body.style.overflow = "initial";
        window.scrollTo(this.state.oldScreenX, this.state.oldScreenY);
    }

    hideEditModal(){
        this.setState({ 
            editButtonStyle: { display: 'none'},
            about: this.state.owner_data.about,
            firstname: this.state.owner_data.firstname,
            lastname: this.state.owner_data.lastname,
            followers: this.state.owner_data.followers,
            follows: this.state.owner_data.follows
        });
        document.body.style.overflow = "initial";
        window.scrollTo(this.state.oldScreenX, this.state.oldScreenY);
    }

    getProfileButtons(){
        if (!this.state.visitorIsOwner){
            return (
                <div className="profile-buttons">
                    <button style={this.state.followOwnerStyle} className="follow-profile-button" onClick={this.follow}>Follow</button>
                    <button style={this.state.unfollowOwnerStyle} className="unfollow-profile-button" onClick={this.unfollow}>Unfollow</button>
                    <button className="about-profile-button" onClick={this.showAboutModal}>About</button>
                </div>
            )
        }
        return (
            <div className="profile-buttons">
                <button className="about-profile-button" onClick={this.showAboutModal}>About</button>
                <button className="edit-profile-button" onClick={this.showEditModal}> Edit Profile</button>
            </div>
        )
    }

    follow(){
        console.log(this.state.visitor)
        if (!this.state.visitor) return;
        axios.post("http://localhost:5111/users/follow/" + this.state.owner_data.uid, {
            username: this.state.visitor.username
        })
        .then((response) => {
            this.setState({
                followers: response.data,
                followOwnerStyle: {display: "none"},
                unfollowOwnerStyle: {display: "initial"}
            })
        })
        .catch((error) => { console.log(error); });
    }

    unfollow(){
        axios.post("http://localhost:5111/users/unfollow/" + this.state.owner_data.uid, {
            username: this.state.visitor.username
        })
        .then((response) => {
            this.setState({
                followers: response.data,
                followOwnerStyle: {display: "initial"},
                unfollowOwnerStyle: {display: "none"}
            })
        })
        .catch((error) => { console.log(error); });
    }

    componentDidMount(e){
        if (this.props.location.state === null)
        {return;}
        axios.get("http://localhost:5111/users/" + this.props.location.state.owner)
        .then(response => {
            this.setState({
                owner_data: response.data,
                followers: response.data.followers,
                follows: response.data.follows,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                about: response.data.about,
                loaded: true
            }, () => {
                if (this.state.visitorIsOwner)
                {
                    this.setState({
                        followOwnerStyle: {display: "none"},
                        unfollowOwnerStyle: {display: "none"}
                    })
                }
                else if (this.state.visitor) {
                    if (this.state.followers.includes(this.state.visitor.username))
                    {
                        this.setState({
                            followOwnerStyle: {display: "none"}
                        })
                    }
                    else {
                        this.setState({
                            unfollowOwnerStyle: {display: "none"}
                        })
                    }
                } else {
                    this.setState({
                        followOwnerStyle: {display: "none"},
                        unfollowOwnerStyle: {display: "none"}
                    })
                }
            });
        })
        .catch((error) => { console.log(error); });


        this.itemsList = this.itemsList.bind(this);
        this.showAboutModal = this.showAboutModal.bind(this);
        this.hideAboutModal = this.hideAboutModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.hideEditModal = this.hideEditModal.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.onEditCommentSubmit = this.onEditCommentSubmit.bind(this);
        this.showFollowersOrFollowings = this.showFollowersOrFollowings.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onAboutChange = this.onAboutChange.bind(this);
        this.removeFromFollows = this.removeFromFollows.bind(this);
        this.removeFromFollowers = this.removeFromFollowers.bind(this);
        this.changeUserButStayOnPage = this.changeUserButStayOnPage.bind(this);
    }

    onFirstNameChange(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onLastNameChange(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onAboutChange(e) {
        this.setState({
            about: e.target.value
        });
    }

    removeFromFollows(following_param) {
        console.log("removing from followers: " + following_param)
        this.setState({
            follows: this.state.follows.filter(following => {
                return following !== following_param
            })
        });
    }

    removeFromFollowers(follower_param) {
        console.log("removing from followers: " + follower_param)
        this.setState({
            followers: this.state.followers.filter(follower => {
                return follower !== follower_param
            })
        });
    }

    showFollowersOrFollowings(followers, callback) {
        var key = -1;
        return followers.map(follower => {
            key++;
            return <Follower follower={follower} removeHandler={callback} key={key} />
        })
    }

    onEditCommentSubmit(e) {
        e.preventDefault()
        const body = {
            firstname: this.state.firstname.trim(),
            lastname: this.state.lastname.trim(),
            about: this.state.about.trim(),
            followers: this.state.followers,
            follows: this.state.follows
        }

        if (body.firstname === "" || body.lastname === "")
        {
            return;
        }

        axios.post("http://localhost:5111/users/edit/" + this.state.owner_data.uid, body)
        .then((response) => {
            this.setState({
                owner_data: response.data,
                about: response.data.about,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                followers: response.data.followers,
                follows: response.data.follows
            }, () => {
                this.hideEditModal()
            });
        })
        .catch((error) => { console.log(error); });
    }

    changeUserButStayOnPage(){
        window.location.reload()
    }

    render(){
        return this.state.owner === null ? <Redirect to={{
            pathname: `/`,
            state: {"user": this.state.visitor}
        }}/> : (!this.state.loaded ? "Loading..." : (
            <div>
                {showNavbar(this.state.visitor, this.changeUserButStayOnPage)}
                <div className="user-side"> 
                    <Link to={{
                            pathname: "/",
                            state: this.state.visitor
                    }}>
                    <p className="back">{getBackWhite(30, 30, "black")}</p>
                    </Link>
                    {hasPrinterIconAppear(this.props.location.state)}
                    <img className="cover-image" src={img}/>
                    {getUserSvg(60, 60, "person-icon")}
                    <div className="middle-user-side">
                        <h2>{this.state.owner_data.firstname} {this.state.owner_data.lastname}</h2> 
                        {addButtonAppear(this.state.visitor)}
                    </div>
                    <div className="follow-post">
                        <p>Followers: {this.state.followers.length}</p>
                        <p>Follows: {this.state.owner_data.follows.length}</p>
                        <p>Posts: {this.state.owner_data.posts.length}</p>
                    </div>
                </div>
                {this.getProfileButtons()}
                <div className="modal" style={this.state.aboutDisplay}>
                    <div className="modal-div">
                        <div className="about-about">
                            <h3 className="modal-title">About</h3><br/>
                            <p className="modal-text">{this.state.owner_data.about}</p><br/>
                            <button className="about-back-button" onClick={this.hideAboutModal}>{getBackWhite()}Back</button>
                            <br/>
                        </div>
                    </div>
                </div>
                <div className="modal" style={this.state.editButtonStyle}>
                    <div className="edit-profile-div">
                        <h3 className="modal-title">Edit Your Profile {getUserSvg(28,28)}</h3><br/>
                        <form id='EditProfileForm' className="edit-profile-form" onSubmit={this.onEditCommentSubmit}>
                            <label htmlFor="firstname_text"> Firstname: 
                                <input type="text" value={this.state.firstname} onChange={this.onFirstNameChange} />
                            </label><br/>
                            <label htmlFor="lastname_text"> Lastname: 
                                <input type="text" value={this.state.lastname} onChange={this.onLastNameChange} />
                            </label><br/>
                            <label htmlFor="about_text"> About: 
                                <input type="text" value={this.state.about} onChange={this.onAboutChange} />
                            </label><br/>
                            <div className="followers-and-follows-container">
                                <div className="follower-and-follows-div">Followers:</div>
                                <div className="follower-and-follows-div">Following:</div>
                            </div>
                            <div className="followers-and-follows-container">
                                <div className="follower-and-follows-div">{this.showFollowersOrFollowings(this.state.followers, this.removeFromFollowers)}</div>
                                <div className="follower-and-follows-div">{this.showFollowersOrFollowings(this.state.follows, this.removeFromFollows)}</div>
                            </div>
                        </form> 
                        <div className="edit-profile-buttons-container">
                            <button className="edit-profile-button" onClick={this.hideEditModal}>Back</button>
                            <button className="edit-profile-button" type='submit' form="EditProfileForm">Edit</button>
                        </div>
                    </div>
                </div>
                <div className="middle_div_enum_products">
                   {this.itemsList()}
                </div>
                <div className="hr-line-with-text-div">
                    <span className="hr-line-with-text-span">
                        User Favorites
                    </span>
                </div>
                <div className="middle_div_enum_products">
                   {this.favouritesList()}
                </div>
            </div>
        ))
    }
}