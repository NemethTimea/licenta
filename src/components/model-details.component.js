import React, { Component } from 'react';
import {showNavbar} from "./navbar.component";
import { Comment } from './comment.component';
import { Link, Redirect } from 'react-router-dom';
import { getComment, getDownload, getLike, getPrinter, getUserSvg, getBackWhite, getDislike, getWarning, getFavorite } from "../other/svgFunctions";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { post } from 'jquery';

export default class ModelDetails extends Component{
    constructor(props){
        super(props);
        this.oldScreenX = 0;
        this.oldScreenY = 0;
        this.path_images = "/uploads/images/"
        this.downloadButtonOnClick = this.downloadButtonOnClick.bind(this);
        this.likeButtonOnClick = this.likeButtonOnClick.bind(this);
        this.dislikeButtonOnClick = this.dislikeButtonOnClick.bind(this);
        this.showDownloadModal = this.showDownloadModal.bind(this);
        this.hideDownloadModal = this.hideDownloadModal.bind(this);
        this.showCommentModal = this.showCommentModal.bind(this);
        this.hideCommentModal = this.hideCommentModal.bind(this);
        this.onCommentValueChange = this.onCommentValueChange.bind(this);
        this.onCommentSubmit =  this.onCommentSubmit.bind(this);
        this.commentList = this.commentList.bind(this);
        this.hideWarningModal = this.hideWarningModal.bind(this);
        this.commentHandler = this.commentHandler.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow =  this.unfollow.bind(this);
        this.state = {
            user: this.props.location.state ? this.props.location.state.user : null,
            postid: this.props.location.state ? this.props.location.state.post_id : null,
            post_owner: null,
            post: null,
            queryList: [],
            followIconDisplay: {},
            buttonUnfollowPost: {},
            buttonFollowPost: {},
            buttonLikePost: {},
            buttonDislikePost: {},
            buttonCommentPost: {},
            buttonDownloadSTL: {},
            download_result: "",
            likeing: true,
            modalDisplay: {},
            modalDownloadDisplay: {},
            comment_text: ""
        }
    }
    commentHandler(new_post){
        this.setState({
            saving_comment: true
        }, () => {
            this.setState({
                post: new_post
            }, () => {
                this.setState({
                    saving_comment: false
                })
            });
        });
        this.forceUpdate();
    }
    onCommentValueChange(e){
        this.setState({
            comment_text: e.target.value
        });
    }
    commentList(){
        var count = -1;
        if (this.state.saving_comment) return;
        return this.state.post.comments.map(comment => {
            count++;
            return <Comment user={this.state.user} post={this.state.post.owner} post_id={this.state.post._id} comment={comment} position={count} commentHandler={this.commentHandler} key={count}/>;
        })
    }
    follow(){
        if (this.state.user || this.state.user.login){
            axios.post("http://localhost:5111/items/follow/" + this.state.post._id, {
                username: this.state.user.username
            })
            .then((response) => {
                if (response.data != "not allowed")
                {
                    this.setState({ 
                        followIconDisplay: { display: 'flex'},
                        buttonUnfollowPost: {display: "initial", backgroundColor: "red"},
                        buttonFollowPost: { display: 'none'}
                    });
                }
            });
        } else {
            this.showWarningModal();
        }
    }

    unfollow(){
        if (this.state.user){
            axios.post("http://localhost:5111/items/unfollow/" + this.state.post._id, {
                username: this.state.user.username
            })
            .then(() => {
                this.setState({ 
                    followIconDisplay: { display: 'none'},
                    buttonUnfollowPost: { display: 'none'},
                    buttonFollowPost: { display: 'initial'}
                });
            });
        }
    }

    showCommentModal(){
        if (this.state.user || this.state.user.login){
            this.oldScreenX = window.scrollX;
            this.oldScreenY = window.scrollY;
            this.setState({ modalDisplay: { display: 'flex' } });
            window.scrollTo(0,0);
            document.body.style.overflow = "hidden";
        }else{
            this.showWarningModal();
        }
    }
    
    hideCommentModal(){
        this.setState({
            modalDisplay: { display: 'none' },
            comment_text: ""
        });
        document.body.style.overflow = "initial";
        window.scrollTo(this.oldScreenX, this.oldScreenY);
    }
    
    showDownloadModal(){
        this.oldScreenX = window.scrollX;
        this.oldScreenY = window.scrollY;
        this.setState({ modalDownloadDisplay: { display: 'flex' } });
        window.scrollTo(0,0);
        document.body.style.overflow = "hidden";
    }

    hideDownloadModal(e){
        e.preventDefault();
        this.setState({ modalDownloadDisplay: { display: 'none' } });
        document.body.style.overflow = "initial";
        window.scrollTo(this.oldScreenX, this.oldScreenY);
    }

    downloadButtonOnClick(e){
        e.preventDefault();
        console.log("DOWNLOAD BUTTON CLICKED")
        if (this.state.user || this.state.user.login){
            axios.post("http://localhost:5111/items/download/" + this.state.post._id)
            .then((res) => {
                this.setState({ download_result: res.data.result })
                if(res.data.post != null)
                {
                    this.setState({ post: res.data.post })
                }
                this.showDownloadModal(res)
            })
            .catch((error) => {
                console.log(error);
            });
        }else{
            this.showWarningModal();
        }
    }
    
    likeButtonOnClick(){
        if (this.state.user || this.state.user.login){
            axios.post("http://localhost:5111/items/like/" + this.state.post._id, {
                username: this.state.user.username
            })
            .then((res) => {
                this.setState({ 
                post: res.data.post,
                buttonLikePost: { display: 'none'},
                buttonDislikePost: { display: 'initial'},
                likeing: true
                })
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            this.showWarningModal();
        }
    }
    
    dislikeButtonOnClick(){
        axios.post("http://localhost:5111/items/dislike/" + this.state.post._id, {
            username: this.state.user.username
        })
        .then((res) => {
            this.setState({ 
                post: res.data.post,
                buttonLikePost: { display: 'initial'},
                buttonDislikePost: { display: 'none'},
                likeing: false
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    hideWarningModal(){
        this.setState({ warningModal: { display: 'none' } });
        document.body.style.overflow = "initial";
        window.scrollTo(this.oldScreenX, this.oldScreenY);
    }

    showWarningModal(){
        this.oldScreenX = window.scrollX;
        this.oldScreenY = window.scrollY;
        this.setState({ warningModal: { display: 'flex' } });
        window.scrollTo(0,0);
        document.body.style.overflow = "hidden";
    }
    
    onCommentSubmit(e){
        e.preventDefault();
        const updatedItem = {
            "username" : this.state.user.username,
            "text" : this.state.comment_text.trim() 
        }
        this.setState({
            saving_comment: true
        }, () => {
            axios.post("http://localhost:5111/items/update/" + this.state.post._id, updatedItem)
            .then((response) => {
                this.setState({
                    post: response.data,
                    comment_text: ""
                }, () => {
                    this.hideCommentModal();
                    console.log(this.state.post.comments);
                    this.setState({
                        saving_comment: false
                    })
                });
            })
            .catch((error) => {
                console.log(error);
            });
        });
    }

    componentDidMount(){
        axios.get("http://localhost:5111/items/" + this.state.postid)
        .then(response => {
            this.setState({
                post: response.data
            }, () => {
                if (this.state.user && !this.state.user.login)
                {
                    if (this.state.post.likes.includes(this.state.user.username)){
                        this.setState({
                            buttonLikePost: {display: 'none'}
                        });
                    } else {
                        this.setState({
                            buttonDislikePost: {display: 'none'}
                        });
                    }
                } else {
                    this.setState({
                        buttonDislikePost: {display: 'none'},
                    });
                }

                if (this.state.user && this.state.post.followingUsers.includes(this.state.user.username))
                {
                    this.setState({
                        followIconDisplay: { display: 'flex'},
                        buttonFollowPost: {display: "none"},
                        buttonUnfollowPost: {backgroundColor: "red"}
                    });
                } else {
                    this.setState({
                        followIconDisplay: { display: 'none'},
                        buttonUnfollowPost: {display: "none"}
                    });
                }

                axios.get("http://localhost:5111/users/" + this.state.post.owner)
                .then(res => {
                    this.setState({
                        post_owner: res.data
                    });
                })
                .catch((error) => { console.log(error); });
            });
        })
        .catch((error) => {
            console.log(error);
        });

        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }
    
    render(){
        return (this.state.post_owner === null || this.state.post === null) ? "Loading..." : (
            <div>
                {showNavbar(this.state.user)}
                <div className="product-all">
                    <div className="product-description-div"><br/>
                        <div className="description">
                            <div className="username-printer-align">
                                <Link className="username" to={{
                                    pathname: "/userpage",
                                    state: {
                                        "visitor": this.state.user,
                                        "owner": this.state.post.owner
                                    }
                                }}>
                                    {getUserSvg()}
                                    {this.state.post_owner.firstname} {this.state.post_owner.lastname}
                                </Link>
                                <div style={this.state.followIconDisplay}>{getFavorite(29,29,"yellow")}</div>
                            </div><br/>
                            <h4>{this.state.post.title}</h4><br/>
                            <p>Product Description</p>
                            <div className="post-description-div">
                                {this.state.post.description}
                            </div>
                            <br/><p>ADDITIONAL INFORMATION</p>
                            <div className="product-table">
                                <div className="table-text-style">
                                    <p className="description-table-2row-4row"><b>Dimensions:</b></p>
                                    <p><b>Color:</b></p>
                                    <p><b>Category:</b></p>
                                    <p className="description-table-2row-4row"><b>Size:</b></p>
                                </div>
                                <div className="column-text-font">
                                    <p className="description-table-2row-4row">{this.state.post.dimensions}</p>
                                    <p>{this.state.post.color}</p>
                                    <p>{this.state.post.category}</p>
                                    <p className="description-table-2row-4row">{this.state.post.size}</p>
                                </div><br/>
                            </div>
                        </div>         
                    </div>
                    <div className="product-image-div">
                        <img className="product-image" src={"http://localhost:3000/" + this.path_images + this.state.post.imagename} alt="Sorry can't find your img... :("/> 
                        <div className="like-comment-align">
                            <div className="like-comment-container">
                                {this.state.post.likes.length}
                                {getLike(22,22,"#cf0a5c")}
                            </div>
                            <div className="like-comment-container">
                                {this.state.post.comments.length} 
                                {getComment(22,22,"#099bc7")}
                            </div>
                            <div className="like-comment-container">
                                {this.state.post.nrdownloads} 
                                {getDownload(22,22,"#228B22")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-buttons">
                    <Button style={this.state.buttonLikePost} onClick={this.likeButtonOnClick}>
                        {getLike(23,23)}
                        Like</Button> 
                    <Button style={this.state.buttonDislikePost} onClick={this.dislikeButtonOnClick}>
                        {getDislike(23,23)}
                        Dislike</Button> 
                    <Button style={this.state.buttonCommentPost} onClick={this.showCommentModal}>
                        Comment</Button>
                    <Button style={this.state.buttonDownloadSTL} onClick={this.downloadButtonOnClick}>
                        Download .stl</Button>
                    <Button style={this.state.buttonFollowPost} onClick={this.follow}>
                        Favourite</Button>
                    <Button style={this.state.buttonUnfollowPost} onClick={this.unfollow}>
                        Remove from Favourite</Button>
                </div>
                <div className="print-settings-div">
                    <div className="print-settings-descriptions"><br/>
                        <div className="settings-download-button">
                            <div className="print-icon">
                                <h5>PRINT SETTINGS</h5>
                                {getPrinter()}
                            </div>
                        </div><br/>
                        <div className="print-settings-align">
                            <div>
                                <p><b>Pinter:</b></p>
                                <p>{this.state.post.printer}</p>
                                <p><b>Printer brand:</b></p>
                                <p>{this.state.post.printerbrand}</p>
                                <p><b>Rafts:</b></p>
                                <p>{this.state.post.rafts}</p>
                            </div>
                            <div>
                                <p><b>Supports:</b></p>
                                <p>{this.state.post.supports}</p>
                                <p><b>Resolution:</b></p>
                                <p>{this.state.post.resolution}</p>
                                <p><b>Notes:</b></p>
                                <p>{this.state.post.notes}</p>
                            </div><br/> 
                        </div>
                    </div>
                </div>
                <h3>Comments {getComment(28,28)}</h3>
                {this.commentList()}
                <Link to={{
                    pathname: "/",
                    state: this.state.user
                }}>
                <Button className="button-back-details">BACK</Button>
                </Link>
                <div className="modal" style={this.state.modalDownloadDisplay}>
                    <div className="modal-div">
                        <div className="about-about">
                            <h3 className="modal-title">Download STL</h3><br/>
                            <p className="modal-text">{this.state.download_result}</p><br/>
                            <button className="about-back-button" onClick={this.hideDownloadModal}>{getBackWhite()}Back</button>
                            <br/>
                        </div>
                    </div>
                </div>
                <div className="modal" style={this.state.modalDisplay}>
                    <div className="modal-div">
                        <div className="about-about">
                            <h3 className="modal-title">Comment {getComment(18,18)}</h3><br/>
                            <p className="modal-text"> What is you're opinion? Post it and let us know!</p><br/>
                            <form onSubmit={this.onCommentSubmit}>
                                <input
                                    type="text"
                                    className="comment-input"
                                    value={this.state.comment_text}
                                    onChange={this.onCommentValueChange}
                                /><br/><br/><br/>
                                <div className="comment-buttons-div">
                                    <button className="comment-button" onClick={this.hideCommentModal}>Back</button>
                                    <button className="comment-button">Post</button>
                                </div>
                            </form> 
                            <br/>
                        </div>
                    </div>
                </div>
                <div className="modal" style={this.state.warningModal}>
                    <div className="modal-div">
                        <div className="about-about"><br/>
                            <h3 className="modal-title">{getWarning(28,28,"red")} Warning {getWarning(28,28,"red")}</h3><br/>
                            <p className="modal-text"> If you want to acces a functionality of the app, you must sign into 3D Vision! <br/>
                            If you want to sign in, you must click on the button <i><u>SignIn</u></i>!</p> 
                            <div className="comment-buttons-div">
                                <button className="comment-button" onClick={this.hideWarningModal}>Back</button>
                                <button className="comment-button">
                                    <Link className="white-style-warning-modal" to={{
                                    pathname: "/login/simple",
                                    state: {
                                        "visitor": this.state.user,
                                        "owner": this.state.post.owner
                                    }
                                }}>SignIn</Link></button>
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}