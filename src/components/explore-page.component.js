import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSearch, getLike, getComment, getBackWhite, getExplore} from "../other/svgFunctions";
import { Button } from 'react-bootstrap';
import { Post } from "./post.component";
import { User } from "./user.component";
import axios from 'axios';


export default class Explore extends Component{
    constructor(props){
        super(props);
        this.itemList = this.itemList.bind(this);
        this.state = {
            visitor: this.props.location.state.visitor,
            users: [],
            posts: [],
            query_type: [],
            have_printer: false,
            query_users: false,
            search: ""
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5111/items/')
        .then(response => {this.setState({ posts: response.data })})
        .catch((error) => {console.log(error);})

        this.onTypeSelect = this.onTypeSelect.bind(this)
        this.onChangeHavePrinter = this.onChangeHavePrinter.bind(this)
        this.onChangeFindUsers = this.onChangeFindUsers.bind(this)
        this.onChangeSearch = this.onChangeSearch.bind(this)
        this.onSubmitSearch = this.onSubmitSearch.bind(this)
    }
    
    itemList(){
        return this.state.posts.map(post => {
            return <Post post={post} user={this.state.visitor} key={post._id}/>;
        })
    }
    
    userList(){
        return this.state.users.map(user => {
            return <User user={user} visitor={this.state.visitor} key={user.username}/>;
        })
    }
   
    onTypeSelect(e){
        var new_query = this.state.query_type
        if (new_query.includes(e.target.value))
        {
            new_query = new_query.filter(element => {
                return element !== e.target.value
            })
        } else {
            new_query.push(e.target.value)
        }
        this.setState({
            query_type: new_query
        });
    }

    onChangeHavePrinter(e){
        this.setState({
            have_printer: e.target.checked
        }, () => {
            console.log(this.state.have_printer)
        });
    }
    
    onChangeFindUsers(e){
        this.setState({
            query_users: e.target.checked
        });
    }

    onChangeSearch(e){
        e.preventDefault();
        this.setState({
            search: e.target.value
        });
    }

    onSubmitSearch(e){
        e.preventDefault()
        if (this.state.query_users || this.state.have_printer){
            const filter = {
                search: this.state.search.trim(),
                have_printer: this.state.have_printer
            }

            axios.post("http://localhost:5111/users/filter/", filter)
            .then(response => {
                this.setState({
                    posts: [],
                    users: response.data
                }
            )})
            .catch((error) => {console.log(error);})
        } else {
            const filter = {
                search: this.state.search.trim(),
                category: this.state.query_type
            }

            axios.post("http://localhost:5111/items/filter/", filter)
            .then(response => {
                this.setState({
                    posts: response.data,
                    users: []
                }
            )})
            .catch((error) => {console.log(error);})
        }
    }

    render(){
        return (
            <div className="explore">
                <div className="explore-container">
                    <Link to={{
                        pathname: "/",
                        state:{
                            user: this.state.visitor
                        }
                    }}>
                    <p className="back">{getBackWhite(30, 30, "white")}</p>
                    </Link>
                    <h3 className="align-top">Explore with <b><i>3D Vision</i></b></h3>
                    <p>You can search for any model you want and try the filters below!</p>
                    <p>{getExplore(32,32)}</p>
                    <br/>
                    <form id='ExploreForm' onSubmit={this.onSubmitSearch}>
                        <input className="search-style" type="text" placeholder="Search..." name="search" value={this.state.search} onChange={this.onChangeSearch}/>
                        <Button
                            type="submit"
                            value="SignIn">{getSearch()}</Button>
                    </form>
                    <br/><br/>
                </div>
                <div className="filters-container"><br/>
                    <div className="filters">
                        <label htmlFor="Animals">
                        <div className="form-group filter-box">
                            Animals <input id="Animals" type="checkbox" value="Animals" form='ExploreForm' checked={this.state.query_type.includes("Animals")} onChange={this.onTypeSelect}/>
                        </div>
                        </label>

                        <label htmlFor="Art">
                            <div className="form-group filter-box">
                                Art <input id="Art" type="checkbox" value="Art" form='ExploreForm' checked={this.state.query_type.includes("Art")} onChange={this.onTypeSelect}/>
                            </div>
                        </label>

                        <label htmlFor="Engineering">
                            <div className="form-group  filter-box">
                                Engineering <input id="Engineering" type="checkbox" value="Engineering" form='ExploreForm' checked={this.state.query_type.includes("Engineering")} onChange={this.onTypeSelect}/>
                            </div>
                        </label>

                        <label htmlFor="Structures">
                            <div className="form-group filter-box">
                                Buildings&Structures <input id="Structures" type="checkbox" value="Buildings&Structures" form='ExploreForm' checked={this.state.query_type.includes("Buildings&Structures")} onChange={this.onTypeSelect}/>
                            </div>
                        </label>
                    </div>
                    <div className="filters">
                        <label htmlFor="UsersWithPrinterCheckbox">
                            <div className="form-group filter-box">
                                Users with printer<input id="UsersWithPrinterCheckbox" type="checkbox" form='ExploreForm' checked={this.state.have_printer} onChange={this.onChangeHavePrinter}/>
                            </div>
                        </label>

                        <label htmlFor="FindUsersCheckbox">
                            <div className="form-group filter-box">
                                Find Users <input id="FindUsersCheckbox" type="checkbox" form='ExploreForm' checked={this.state.query_users} onChange={this.onChangeFindUsers}/>
                            </div>
                        </label>
                    </div><br/>
                </div>
                <div className="explore-list">
                    {this.itemList()}
                    {this.userList()}
                </div>
            </div>
        )
    }
}