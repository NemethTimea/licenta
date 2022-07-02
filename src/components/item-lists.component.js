import React, { Component } from 'react';
import {showNavbar} from "./navbar.component";
import { Link } from 'react-router-dom';
import { getLike, getComment, getSearch } from "../other/svgFunctions";
import { Post } from "./post.component";
import axios from 'axios';

export default class ItemsLists extends Component{
    constructor(props){
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.itemList = this.itemList.bind(this);
        this.state = {
            user: this.props.location.state && this.props.location.state.user ? this.props.location.state.user : this.props.location.state,
            items: []
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5111/items/')
            .then(response => {
                this.setState({ items: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteItem(id){
        axios.delete('http://localhost:5111/items/' + id)
            .then(res => console.log(res.data));

        this.setState({
            items: this.state.items.filter(el => el._id !== id)
        })
    }

    itemList(){
        return this.state.items.map(post => {
            return <Post post={post} user={this.state.user} key={post._id}/>;
        })
    }

    render(){
        return (
            <main>
                {showNavbar(this.state.user)}
                <div className="products-list">
                   {this.itemList()}
                </div>
            </main>
        )
    }
}