import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getBack, getDownload, getPrinter } from "../other/svgFunctions";
import axios from 'axios';
import img1 from "../images/butterfly.PNG";


export default class ModelDetails extends Component{
    constructor(props){
        super(props);
        console.log("idk");
    }
   
    render(){
        return (
            <div>
                <div className="product-all">
                    <div className="product-description-div"><br/>
                        <Link className="back" to={{
                            pathname: "/"
                        }}>
                            {getBack()}
                        </Link>
                        <div className="description">
                            <p>PRODUCT NAME</p>
                            <p>Product Description</p>
                            <p>ProductdescriptionProductdescription Productdescription ProductdescriptionProductdescription ProductdescriptionProductdescriptionProductdescriptionProductdescription</p>
                            <br/><p>ADDITIONAL INFORMATION</p><br/>
                            <div className="product-table">
                                <div>
                                    <p><b>Product Number:</b></p>
                                    <p className="description-table-2row-4row"><b>Dimensions:</b></p>
                                    <p><b>Color:</b></p>
                                    <p className="description-table-2row-4row"><b>Size:</b></p>
                                </div>
                                <div className="column-text-font">
                                    <p>id33455</p>
                                    <p className="description-table-2row-4row">23 x 34 x 12 in</p>
                                    <p>Light Brown</p>
                                    <p className="description-table-2row-4row">Small</p>
                                </div>
                            </div>
                        </div>         
                    </div>
                    <div className="product-image-div">
                        <img className="product-image" src={img1}/>
                    </div>
                </div>
                <div className="print-settings-div">
                    <div className="print-settings-descriptions"><br/>
                        <div className="settings-download-button">
                            <p>
                                PRINT SETTINGS
                                {getPrinter()}
                            </p>
                            <button>
                                {getDownload()}
                                Download .stl
                            </button> 
                        </div>
                        
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
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}