import React, { Component } from "react";

class Follower extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="follower-container">
                <div className="follower-username">{this.props.follower}</div>
                <button className="delete-follower-button" onClick={(e) => {
                    e.preventDefault();
                    this.props.removeHandler(this.props.follower);
                }}>
                    <div className="delete-follower-x1">
                        <div className="delete-follower-x2"></div>
                    </div>
                </button>
            </div>
        )
    }
}
export {
    Follower
}
