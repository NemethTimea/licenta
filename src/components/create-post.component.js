import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getBindHourSvg, getBindMinuteSvg, getMoneySvg, getImageSvg } from "../other/svgFunctions";
import axios from 'axios';
import { Button } from 'react-bootstrap';



export default class ModelDetails extends Component{
    constructor(props){
        super(props);
        console.log("idk");
    }
   
    render(){
        return (
            <div>
                <div className="title-create-post">
                    <h4><b>Create New</b> Post</h4><br/>
                    <p className="text-create-item">If you want to add a new model post, just complete the form and press <i>Done</i>!</p>
                </div><br/>
                <div className="create-post-colorfull-container">
                    <div className="create-post-continer">
                        <form encType="multipart/form-data" className="form">
                            <div className="form-group">
                                <label className="label-align">Title: </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group"><br/>
                                <label className="label-align">Description: </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group"><br/>
                                <label className="label-align">Categories: </label>
                                <select
                                    required
                                    className="form-control select-align">
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
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group"><br/>
                                <label className="label-align">Color: </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group"><br/>
                                <label className="label-align">Size: </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group"><br/>
                                <label className="label-align">Image: </label><br/>
                                <input type="file"
                                    // multiple
                                    accept=".png, .jpg, .jpeg"
                                    filename="pictureimage"
                                />
                            </div>
                            <div className="form-group"><br/>
                                <label className="label-align">STL File: </label><br/>
                                <input type="file"
                                    // multiple
                                    accept=".png, .jpg, .jpeg"
                                    filename="pictureimage"
                                />
                            </div><br/>
                        </form>
                    </div>
                </div>
                <div className="title-create-post">
                    <h4><b>Printer</b> Settings</h4><br/>
                    <p className="text-create-item">You also need to complete the <i>Printer Settings</i> form to!</p>
                </div><br/>
                <div className="print-settings-colorfull-container">
                    <div className="create-post-continer">
                        <form encType="multipart/form-data" className="form">
                            <div className="form-group">
                                <label className="label-align">Printer: </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group"><br/>
                                <label className="label-align">Printer brand: </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group"><br/>
                                <label className="label-align">Rafts: </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group"><br/>
                                <label className="label-align">Supports: </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group"><br/>
                                <label className="label-align">Resolution: </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div>
                            <div className="form-group"><br/>
                                <label className="label-align">Notes: </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input-create"/>
                            </div><br/>
                            <Link to={{
                                    pathname: "/",
                                }}><Button
                                        className="button-back"
                                >Back</Button></Link>
                            <Button
                                    type="submit"
                                    className="button-done"
                                    value="Done"
                                >Done</Button>
                        </form>
                    </div>
                </div><br/><br/>
            </div>
        )
    }
}