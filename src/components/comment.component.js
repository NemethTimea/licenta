import React, { Component, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { getLike, getComment, getUserSvg } from  "../other/svgFunctions";

class Comment extends Component {
    constructor(props){
        super(props);
        // console.log(this.props)
        this.state = {
            user: this.props.user,
            post_owner: this.props.post,
            post_id: this.props.post_id,
            comment: this.props.comment,
            position: this.props.position,
            appearEditLink: this.props.user && !this.props.user.login && this.props.comment["username"] == this.props.user.username ? { display: 'flex'} : { display: 'none'},
            appearDeleteLink: 
                this.props.user && !this.props.user.login && (
                    this.props.comment["username"] == this.props.user.username ||
                    this.props.user.username == this.props.post
                ) ? { display: 'flex'} : { display: 'none'},
            editModalDisplay: {},
            deleteModalDisplay: {},
            comment_text: this.props.comment["text"],
            edited_post: ""
        };
        this.oldcomment = this.props.comment["text"];
        this.oldScreenX = 0;
        this.oldScreenY = 0;
        this.onCommentValueChange = this.onCommentValueChange.bind(this);
        this.hideEditCommentModal = this.hideEditCommentModal.bind(this);
        this.hideDeleteCommentModal = this.hideDeleteCommentModal.bind(this);
        this.editComment =  this.editComment.bind(this);
        this.showDeleteCommentModal = this.showDeleteCommentModal.bind(this);
        this.onEditCommentSubmit = this.onEditCommentSubmit.bind(this);
        this.onDeleteCommentSubmit =  this.onDeleteCommentSubmit.bind(this);
    }

    onCommentValueChange(e){
        this.setState({
            comment_text: e.target.value
        });
    }

    hideEditCommentModal(){
        this.setState({ 
            editModalDisplay: { display: 'none' },
            comment_text: this.oldcomment
         });
        document.body.style.overflow = "initial";
        window.scrollTo(this.oldScreenX, this.oldScreenY);
    }

    hideDeleteCommentModal(){
        this.setState({ deleteModalDisplay: { display: 'none'} });
        document.body.style.overflow = "initial";
        window.scrollTo(this.oldScreenX, this.oldScreenY);
    }

    editComment(){
        this.oldScreenX = window.scrollX;
        this.oldScreenY = window.scrollY;
        this.setState({ editModalDisplay: { display: 'flex' } });
        window.scrollTo(0,0);
        document.body.style.overflow = "hidden";
    }

    showDeleteCommentModal(){
        this.oldScreenX = window.scrollX;
        this.oldScreenY = window.scrollY;
        this.setState({ deleteModalDisplay: { display: 'flex'} });
        window.scrollTo(0,0);
        document.body.style.overflow = "hidden";
    }

    onEditCommentSubmit(e){
        e.preventDefault();
        const updatedItem = {
            "username" : this.state.user.username,
            "text" : this.state.comment_text.trim(),
            "position": this.state.position
        }
        console.log(this.state.post_id)
        axios.post("http://localhost:5111/items/editcomment/" + this.state.post_id, updatedItem)
        .then((response) => {
            this.setState({
                post: response.data,
                comment: response.data.comments[this.state.position]
            }, () => {
                this.hideEditCommentModal();
                this.props.commentHandler(response.data);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    onDeleteCommentSubmit(){
        const updatedItem = {
            "position": this.state.position
        }
        axios.post("http://localhost:5111/items/deletecomment/" + this.state.post_id, updatedItem)
        .then((response) => {
            this.setState({
                post: response.data
            }, () => {
                this.hideDeleteCommentModal();
                this.props.commentHandler(response.data);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="comment-container">
                <hr/>
                <div className="comment-delete-space-in-between">
                    <div className="comment-in-div">
                        <div className="border-in-comm">
                            <div className="username-icon">
                                <Link to={{
                                    pathname: "/userpage",
                                    state: {
                                    "visitor": this.state.user,
                                    "owner": this.state.post_owner,
                                    }
                                }}><h5 className="comments-username"> {getUserSvg()} {this.state.comment["username"]}</h5></Link>
                            </div>
                        </div>
                        <div className="paragraph-comment">
                            <p>{this.state.comment["text"]}</p>
                        </div>
                    </div>
                    <button style={this.state.appearDeleteLink} onClick={this.showDeleteCommentModal} className="color-delete">Delete</button>
                    <button style={this.state.appearEditLink} onClick={this.editComment} className="edit-link"> Edit</button>
                </div>
                <hr/>
                <div className="modal" style={this.state.editModalDisplay}>
                    <div className="modal-delete-div">
                        <div className="about-about">
                            <h3 className="modal-title">Edit Your Comment {getComment(18,18)}</h3><br/>
                            <form onSubmit={this.onEditCommentSubmit}>
                                <input
                                    type="text"
                                    className="comment-input"
                                    value={this.state.comment_text}
                                    onChange={this.onCommentValueChange}
                                /><br/><br/><br/>
                                <div className="comment-buttons-div">
                                    <button className="comment-button" onClick={this.hideEditCommentModal}>Back</button>
                                    <button className="comment-button">Post</button>
                                </div>
                            </form> 
                            <br/>
                        </div>
                    </div>
                </div>
                <div className="modal" style={this.state.deleteModalDisplay}>
                    <div className="modal-delete-div">
                        <div className="about-about">
                            <h3 className="modal-delete-title">Are you sure you want to <b><u>DELETE</u></b> this comment?</h3><br/>
                                <div className="comment-buttons-div">
                                    <button className="comment-button" onClick={this.hideDeleteCommentModal}>Back</button>
                                    <button className="comment-button delete-red" onClick={this.onDeleteCommentSubmit}>Delete</button>
                                </div>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        )}
    }
export {
    Comment
}
