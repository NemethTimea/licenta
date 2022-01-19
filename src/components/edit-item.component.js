import React, { Component } from 'react';
import axios from "axios";

export default class EditItem extends Component{
    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeImages = this.onChangeImages.bind(this);
        this.onChangeDimensions = this.onChangeDimensions.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: "",
            description: "",
            category: "Art",
            image: null,
            dimensions: "",
            color: "",
            size: "Small"
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5111/users/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    category: response.data.category,
                    image: response.data.image,
                    dimensions: response.data.dimensions,
                    color: response.data.color,
                    size: response.data.size
                })
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        })
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }
    onChangeCategory(e){
        this.setState({
            category: e.target.value
        })
    }
    onChangeImages(e){
        this.setState({
            image: e.target.value
        })
    }
    onChangeDimensions(e){
        this.setState({
            dimensions: e.target.value
        })
    }
    onChangeColor(e){
        this.setState({
            color: e.target.value
        })
    }
    onChangeSize(e){
        this.setState({
            size: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("category", this.state.category);
        formData.append("dimensions", this.state.dimensions);
        formData.append("color", this.state.color);
        formData.append("size", this.state.size);
        formData.append("image", this.state.image);

        axios.post("http://localhost:5111/items/update"+this.props.match.params.id, formData)
            .then(() => {
                this.setState({
                    title: "",
                    description: "",
                    category: "",
                    image: null,
                    dimensions: "",
                    color: "",
                    size: ""
                });
            })
            .catch((error) => {
                if (error.response){
                    console.log(error.response);
                }
                else if(error.request){
                    console.log(error.request);
                }
                else if(error.message){
                    console.log(error.message);
                }
            });
        // window.location = '/';
    }

    render(){
        return (
        <div>
            <h3>Edit Item Log</h3>
            <form onSubmit={this.onSubmit} encType="multipart/form-data" >
              <div className="form-group"> 
                <label>Title: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    />
              </div>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Categories: </label>
                    <select
                        required
                        defaultValue={this.state.category}
                        onChange={this.onChangeCategory}
                        className="form-control">
                            <option value="Art">Art</option>
                            <option value="Animals">Animals</option>
                            <option value="Buildings&Structures">Buildings&Structures</option>
                            <option value="Engineering">Engineering</option>
                    </select>
              </div>
              <div className="form-group">
                <label>Dimensions: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.dimensions}
                    onChange={this.onChangeDimensions}
                    />
              </div>
              <div className="form-group">
                <label>Color: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.color}
                    onChange={this.onChangeColor}
                    />
              </div>
              <div className="form-group">
                <label>Size: </label>
                <select
                    required
                    className="form-control"
                    defaultValue={this.state.size}
                    onChange={this.onChangeSize}>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Big">Big</option>
                </select>
              </div>
              <div className="form-group">
                <label>Image: </label><br/>
                <input type="file"
                    // multiple
                    accept=".png, .jpg, .jpeg"
                    filename="pictureimage"
                    selected={this.state.image}
                    onChange={this.onChangeImages}
                />
              </div><br/>
              <div className="form-group">
                <input type="submit" value="Edit Item Log" className="btn btn-primary" />
              </div>
            </form>
        </div>
        )
    }
}