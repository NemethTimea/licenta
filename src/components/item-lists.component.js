import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
                {/* <h3>Logged Items</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Dimensions</th>
                            <th>Color</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.itemList() }
                    </tbody>
                </table> */}
            </div>
        )
    }
}