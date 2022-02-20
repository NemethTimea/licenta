import React, { Component } from 'react';
import Navbar from "./navbar.component";
import { Link } from 'react-router-dom';
import { getLike, getComment, getSearch } from "../other/svgFunctions";
import axios from 'axios';
import img1 from "../images/butterfly.PNG";
import img2 from "../images/minirobot.PNG";
import img3 from "../images/building.PNG";
import img4 from "../images/Christmas.PNG";
import img5 from "../images/lamp.PNG";

const Item = props => (
    <tr>
        <td>{props.item.title}</td>
        <td>{props.item.description}</td>
        <td>{props.item.category}</td>
        <td>{props.item.image}</td>
        <td>{props.item.dimensions}</td>
        <td>{props.item.color}</td>
        <td>{props.item.size}</td>
        <td>
            <Link to={"/edit/" + props.item._id}>edit</Link> | <a href="#" onClick={() => { props.deleteItem(props.item._id) }}>delete</a>
        </td>
    </tr>
)

export default class ItemsLists extends Component{
    constructor(props){
        super(props);

        this.deleteItem = this.deleteItem.bind(this);

        this.state = {items: []};
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
        return this.state.items.map(currentitem => {
            return <Item item={currentitem} deleteItem={this.deleteItem} key={currentitem._id}/>;
        })
    }

    render(){
        return (
            <div>
                <Navbar/>
                <nav className="menubar">
                    <div>
                        <p>Art</p>
                    </div>
                    <div>
                        <p>Engineering</p>
                    </div>
                    <form className="search_engine" action="">
                        <input type="text" placeholder="Search.." name="search"/>
                        {getSearch()}
                    </form>
                    <div>
                        <p>Animals</p>
                    </div>
                    <div>
                        <p>Buildings & Structures</p>         
                    </div>
                </nav>
                <div className="middle_div_enum_products">
                    <div>
                        <div className="user_who_posted">
                            <p>User - Post title</p>
                        </div>
                        <div>
                            <Link to={{
                                pathname: "/details"
                            }}><img className="modelimage" src={img1}/></Link>
                        </div>
                        <div className="functionalities">
                            <div className="like">
                                {getLike()}
                                <p>Like</p>
                            </div>
                            <div className="comment">
                                {getComment()}
                                <p>Comment</p>
                            </div>
                        </div>  
                        <Link to={{
                            pathname: "/details",
                            state: {
                                user: null
                            }
                        }}><button className="button_details">Details</button></Link>
                    </div>
                    <div>
                        <div className="user_who_posted">
                            <p>User - Post title</p>
                        </div>
                        <div>
                            <Link to={{
                                pathname: "/details"
                            }}><img className="modelimage" src={img2}/></Link>
                        </div>
                        <div className="functionalities">
                            <div className="like">
                                {getLike()}
                                <p>Like</p>
                            </div>
                            <div className="comment">
                                {getComment()}
                                <p>Comment</p>
                            </div>
                        </div>  
                        <Link to={{
                            pathname: "/details"
                        }}><button className="button_details">Details</button></Link>
                    </div>
                    <div>
                        <div className="user_who_posted">
                            <p>User - Post title</p>
                        </div>
                        <div>
                            <Link to={{
                                pathname: "/details"
                            }}><img className="modelimage" src={img3}/></Link>
                        </div>
                        <div className="functionalities">
                            <div className="like">
                                {getLike()}
                                <p>Like</p>
                            </div>
                            <div className="comment">
                                {getComment()}
                                <p>Comment</p>
                            </div>
                        </div>  
                        <Link to={{
                            pathname: "/details"
                        }}><button className="button_details">Details</button></Link>
                    </div>
                    <div>
                        <div className="user_who_posted">
                            <p>User - Post title</p>
                        </div>
                        <div>
                            <Link to={{
                                pathname: "/details"
                            }}><img className="modelimage" src={img4}/></Link>
                        </div>
                        <div className="functionalities">
                            <div className="like">
                                {getLike()}
                                <p>Like</p>
                            </div>
                            <div className="comment">
                                {getComment()}
                                <p>Comment</p>
                            </div>
                        </div>  
                        <Link to={{
                            pathname: "/details"
                        }}><button className="button_details">Details</button></Link>
                    </div>
                </div>
                <div className="middle_div_enum_products">
                    <div>
                        <div className="user_who_posted">
                            <p>User - Post title</p>
                        </div>
                        <div>
                            <Link to={{
                                pathname: "/details"
                            }}><img className="modelimage" src={img5}/></Link>
                        </div>
                        <div className="functionalities">
                            <div className="like">
                                {getLike()}
                                <p>Like</p>
                            </div>
                            <div className="comment">
                                {getComment()}
                                <p>Comment</p>
                            </div>
                        </div>  
                        <Link to={{
                            pathname: "/details"
                        }}><button className="button_details">Details</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}