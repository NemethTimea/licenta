import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default class CreatePost extends Component{
    constructor(props){
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeImages = this.onChangeImages.bind(this);
        this.onChangeSTL = this.onChangeSTL.bind(this);
        this.onChangeDimensions = this.onChangeDimensions.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);

        this.onChangePrinter = this.onChangePrinter.bind(this);
        this.onChangePrinterBrand = this.onChangePrinterBrand.bind(this);
        this.onChangeRafts = this.onChangeRafts.bind(this);
        this.onChangeSupports = this.onChangeSupports.bind(this);
        this.onChangeResolution = this.onChangeResolution.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            description: '',
            category: 'Art',
            image: null,
            imagename: '',
            stlfile: null,
            stlfilename: '',
            dimensions: '',
            color: '',
            size: '',
            printer: '',
            printerbrand: '',
            rafts: '',
            support: '',
            resolution: '',
            notes: '',
            user: this.props.location.state
        }
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
            image: e.target.files[0],
            imagename: e.target.files[0].name
        })
    }
    onChangeSTL(e){
        this.setState({
            stlfile: e.target.files[0],
            stlfilename: e.target.files[0].name
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
    onChangePrinter(e){
        this.setState({
            printer: e.target.value
        })
    }
    onChangePrinterBrand(e){
        this.setState({
            printerbrand: e.target.value
        })
    }
    onChangeRafts(e){
        this.setState({
            rafts: e.target.value
        })
    }
    onChangeSupports(e){
        this.setState({
            support: e.target.value
        })
    }
    onChangeResolution(e){
        this.setState({
            resolution: e.target.value
        })
    }
    onChangeNotes(e){
        this.setState({
            notes: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("category", this.state.category);
        formData.append("image", this.state.image);
        formData.append("imagename", this.state.imagename);
        formData.append("stlfile", this.state.stlfile);
        formData.append("stlfilename", this.state.stlfilename);
        formData.append("dimensions", this.state.dimensions);
        formData.append("color", this.state.color);
        formData.append("size", this.state.size);
        formData.append("printer", this.state.printer);
        formData.append("printerbrand", this.state.printerbrand);
        formData.append("rafts", this.state.rafts);
        formData.append("supports", this.state.support);
        formData.append("resolution", this.state.resolution);
        formData.append("notes", this.state.notes);
        formData.append("owner", this.state.user.username);

        axios.post("http://localhost:5111/items/createNewPost", formData)
            .then(() => {
                this.setState({
                    title: "",
                    description: "",
                    category: "",
                    image: null,
                    imagename: "",
                    stlfile: null,
                    stlfilename: "",
                    dimensions: "",
                    color: "",
                    size: "",
                    printer: "",
                    printerbrand: "",
                    rafts: "",
                    supports: "",
                    resolution: "",
                    notes: ""
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
            console.log(formData);
    }
   
    render(){
        if(this.state.user === undefined || this.state.user === null || this.state.user === 0 || this.state.user === ""){
            return <Redirect to={{
                pathname: `/login`,
                state: this.state.user
            }}/>;
        }
        return (
            <div className="split-in-two">
                <div className="all-create-post">
                    <div className="title-create-post">
                        <h4><b>Create New</b> Post</h4><br/>
                        <p className="text-create-item">If you want to add a new model post, just complete the form and press <i>Done</i>!</p>
                    </div><br/>
                    <div className="create-post-colorfull-container">
                        <div className="create-post-continer">
                            <form onSubmit={this.onSubmit} encType="multipart/form-data" className="form form-part-in-two">
                                <div className="form-group">
                                    <label className="label-align">Title: </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"
                                        value={this.state.title}
                                        onChange={this.onChangeTitle}/>
                                </div>
                                <div className="form-group">
                                    <label className="label-align">Description: </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}/>
                                </div>
                                <div className="form-group"><br/>
                                    <label className="label-align">Categories: </label>
                                    <select
                                        required
                                        className="form-control select-align"
                                        value={this.state.category}
                                        onChange={this.onChangeCategory}>
                                        <option value="Art">Art</option>
                                        <option value="Animals">Animals</option>
                                        <option value="Buildings&Structures">Buildings&Structures</option>
                                        <option value="Engineering">Engineering</option>
                                    </select>
                                </div>
                                <div className="form-group"><br/>
                                    <label className="label-align">Dimensions: </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"
                                        value={this.state.dimensions}
                                        onChange={this.onChangeDimensions}/>
                                </div>
                                <div className="form-group"><br/>
                                    <label className="label-align">Color: </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"
                                        value={this.state.color}
                                        onChange={this.onChangeColor}/>
                                </div>
                                <div className="form-group"><br/>
                                    <label className="label-align">Size: </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"
                                        value={this.state.size}
                                        onChange={this.onChangeSize}/>
                                </div>
                                <div className="form-group"><br/>
                                    <label className="label-align">Image: </label><br/>
                                    <input type="file"
                                        // multiple
                                        accept=".png, .jpg, .jpeg"
                                        filename="image"
                                        selected={this.state.image}
                                        onChange={this.onChangeImages}
                                    />
                                </div>
                                <div className="form-group"><br/>
                                    <label className="label-align">STL File: </label><br/>
                                    <input type="file"
                                        // multiple
                                        accept=".stl"
                                        filename="stlfile"
                                        selected={this.state.stlfile}
                                        onChange={this.onChangeSTL}
                                    />
                                </div>
                                <br/>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="all-printer-settings">
                    <div className="title-create-post">
                        <h4><b>Printer</b> Settings</h4><br/>
                        <p className="text-create-item">You also need to complete the <i>Printer Settings</i> form to!</p>
                    </div><br/>
                    <div className="print-settings-colorfull-container">
                        <div className="create-post-continer">
                            <form onSubmit={this.onSubmit} encType="multipart/form-data" className="form pritner-form-part-in-two">
                                <div className="form-group"><br/>
                                    <label className="label-align">Printer: </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"
                                        value={this.state.printer}
                                        onChange={this.onChangePrinter}/>
                                </div>
                                <div className="form-group"><br/>
                                    <label className="label-align">Printer brand: </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"
                                        value={this.state.printerbrand}
                                        onChange={this.onChangePrinterBrand}/>
                                </div>
                                <div className="form-group"><br/>
                                    <label className="label-align">Rafts: </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"
                                        value={this.state.rafts}
                                        onChange={this.onChangeRafts}/>
                                </div>
                                <div className="form-group"><br/>
                                    <label className="label-align">Supports: </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"
                                        value={this.state.supports}
                                        onChange={this.onChangeSupports}/>
                                </div>
                                <div className="form-group"><br/>
                                    <label className="label-align">Resolution: </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"
                                        value={this.state.resolution}
                                        onChange={this.onChangeResolution}/>
                                </div>
                                <div className="form-group"><br/>
                                    <label className="label-align">Notes: </label><br/>
                                    <input
                                        type="text"
                                        required
                                        className="form-input-create"
                                        value={this.state.notes}
                                        onChange={this.onChangeNotes}/>
                                </div><br/><br/>
                                <Link to={{
                                        pathname: "/",
                                        state: this.state.user
                                    }}><Button
                                            className="button-back"
                                    >Back</Button>
                                </Link>
                                <Button
                                        type="submit"
                                        className="button-done"
                                        value="Done"
                                >Done</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}