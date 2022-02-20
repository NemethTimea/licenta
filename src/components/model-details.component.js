import React, { Component } from 'react';
import Navbar from "./navbar.component";
import { Link } from 'react-router-dom';
import { getBackWhite, getComment, getDownload, getLike, getPrinter, getUserSvg } from "../other/svgFunctions";
import axios from 'axios';
import img1 from "../images/butterfly.PNG";
import { Button } from 'react-bootstrap';


export default class ModelDetails extends Component{
    constructor(props){
        super(props);
        console.log("idk");
    }
   
    render(){
        return (
            <div>
                <Navbar/>
                <div className="product-all">
                    <div className="product-description-div"><br/>
                        <div className="description">
                            <p className="username">
                                {getUserSvg()}
                                username</p>
                            <h4>PRODUCT NAME</h4><br/>
                            <p>Product Description</p>
                            <p>ProductdescriptionProductdescription Productdescription ProductdescriptionProductdescription ProductdescriptionProductdescriptionProductdescriptionProductdescription</p>
                            <br/><p>ADDITIONAL INFORMATION</p>
                            <div className="product-table">
                                <div className="table-text-style">
                                    <p><b>Number:</b></p>
                                    <p className="description-table-2row-4row"><b>Dimensions:</b></p>
                                    <p><b>Color:</b></p>
                                    <p className="description-table-2row-4row"><b>Size:</b></p>
                                </div>
                                <div className="column-text-font">
                                    <p>id33455</p>
                                    <p className="description-table-2row-4row">23 x 34 x 12 in</p>
                                    <p>Light Brown</p>
                                    <p className="description-table-2row-4row">Small</p>
                                </div><br/>
                            </div>
                        </div>         
                    </div>
                    <div className="product-image-div">
                        <img className="product-image" src={img1}/>
                    </div>
                </div>
                <div className="bottom-buttons">
                    <Button>
                        Like</Button> 
                    <Button>
                        Comment</Button>
                    <Button>
                        Download .stl</Button>
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
                                <p>Qidi X-One</p>
                                <p><b>Printer brand:</b></p>
                                <p>X-One</p>
                                <p><b>Rafts:</b></p>
                                <p>No</p>
                            </div>
                            <div>
                                <p><b>Supports:</b></p>
                                <p>No</p>
                                <p><b>Resolution:</b></p>
                                <p>0.200</p>
                                <p><b>Notes:</b></p>
                                <p>Nothing to say about the model.</p>
                            </div><br/> 
                        </div>
                    </div>
                </div>
                <h3>Comments</h3>
                <div className="comment-container">
                    <hr/>
                    <div className="comment-delete-space-in-between">
                        <div className="comment-in-div">
                            <div className="border-in-comm">
                                <div className="username-icon">
                                    {getUserSvg()}
                                    <h5>UserName</h5>
                                </div>
                            </div>
                            <div className="paragraph-comment">
                                <p> This product is beautiful. I like it so much!!!! </p>
                            </div>
                        </div>
                        <p className="color-delete">Delete</p>
                        <p className="edit-link"> Edit</p>
                    </div>
                    <hr/>
                </div>
                <div className="comment-container">
                    <hr/>
                    <div className="comment-delete-space-in-between">
                        <div className="comment-in-div">
                            <div className="border-in-comm">
                                <div className="username-icon">
                                    {getUserSvg()}
                                    <h5>UserName</h5>
                                </div>
                            </div>
                            <div className="paragraph-comment">
                                <p> Butterflies are insects in the macrolepidopteran clade Rhopalocera from the order Lepidoptera, which also includes moths. Adult butterflies have large, often brightly coloured wings, and conspicuous, fluttering flight. The group comprises the large superfamily Papilionoidea, which contains at least one former group </p>
                            </div>
                        </div>
                        <p className="color-delete">Delete</p>
                        <p className="edit-link"> Edit</p>
                    </div>
                    <hr/>
                </div>
                <div className="comment-container">
                    <hr/>
                    <div className="comment-delete-space-in-between">
                        <div className="comment-in-div">
                            <div className="border-in-comm">
                                <div className="username-icon">
                                    {getUserSvg()}
                                    <h5>UserName</h5>
                                </div>
                            </div>
                            <div className="paragraph-comment">
                                <p> Cool stuff idk. </p>
                            </div>
                        </div>
                        <p className="color-delete">Delete</p>
                        <p className="edit-link"> Edit</p>
                    </div>
                    <hr/>
                </div>
                <div className="comment-container">
                    <hr/>
                    <div className="comment-delete-space-in-between">
                        <div className="comment-in-div">
                            <div className="border-in-comm">
                                <div className="username-icon">
                                    {getUserSvg()}
                                    <h5>UserName</h5>
                                </div>
                            </div>
                            <div className="paragraph-comment">
                                <p> Butterflies are insects in the macrolepidopteran clade Rhopalocera from the order Lepidoptera, which also includes moths. Adult butterflies have large, often brightly coloured wings, and conspicuous, fluttering flight. The group comprises the large superfamily Papilionoidea, which contains at least one former group, the skippers (formerly the superfamily "Hesperioidea"), and the most recent analyses suggest it also contains the moth-butterflies (formerly the superfamily "Hedyloidea"). </p>
                            </div>
                        </div>
                        <p className="color-delete">Delete</p>
                        <p className="edit-link"> Edit</p>
                    </div>
                    <hr/>
                    <Link to={{
                        pathname: "/",
                    }}>
                    <Button className="button-back-details">BACK</Button>
                    </Link>
                </div>
            </div>
        )
    }
}