import React, { Component } from 'react';
import axios from "axios";

export default class CreateItem extends Component{
    constructor(props){
        super(props);

        this.onChangePrinter = this.onChangePrinter.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeRafts = this.onChangeRafts.bind(this);
        this.onChangeSupport = this.onChangeSupport.bind(this);
        this.onChangeResolution = this.onChangeResolution.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            printer: "",
            model: "",
            brand: "",
            user: "",
            raft: "",
            support: "",
            resolution: "",
            notes: ""
        }
    }

    onChangePrinter(e){
        this.setState({
            printer: e.target.value
        })
    }
    onChangeModel(e){
        this.setState({
            model: e.target.value
        })
    }
    onChangeBrand(e){
        this.setState({
            brand: e.target.value
        })
    }
    onChangeUser(e){
        this.setState({
            user: e.target.value
        })
    }
    onChangeRafts(e){
        this.setState({
            raft: e.target.value
        })
    }
    onChangeSupport(e){
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

        formData.append("printer", this.state.printer);
        formData.append("model", this.state.model);
        formData.append("brand", this.state.brand);
        formData.append("user", this.state.user);
        formData.append("raft", this.state.raft);
        formData.append("support", this.state.support);
        formData.append("resolution", this.state.resolution);
        formData.append("notes", this.state.notes);

        axios.post("http://localhost:5111/printers/add", formData)
            .then(() => {
                this.setState({
                    printer: "",
                    model: "",
                    brand: "",
                    user: "",
                    raft: "",
                    support: "",
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
        // window.location = '/';
    }

    render(){
        return (
        <div>
            <h3>Create Printer</h3>
            <form onSubmit={this.onSubmit} encType="multipart/form-data" >
              <div className="form-group"> 
                <label>Printer: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.printer}
                    onChange={this.onChangePrinter}
                    />
              </div>
              <div className="form-group"> 
                <label>Model: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.model}
                    onChange={this.onChangeModel}
                    />
              </div>
              <div className="form-group">
                <label>Printer brand: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.brand}
                    onChange={this.onChangeBrand}
                    />
              </div>
              <div className="form-group">
                <label>User: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.user}
                    onChange={this.onChangeUser}
                    />
              </div>
              <div className="form-group">
                <label>Rafts: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.raft}
                    onChange={this.onChangeRafts}
                    />
              </div>
              <div className="form-group">
                <label>Support: </label>
                <input 
                    type="text"
                    className="form-control"
                    value={this.state.support}
                    onChange={this.onChangeSupport}
                    />
              </div>
              <div className="form-group">
                <label>Resolution: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.resolution}
                    onChange={this.onChangeResolution}
                    />
              </div>
              <div className="form-group">
                <label>Notes: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.notes}
                    onChange={this.onChangeNotes}
                    />
              </div><br/>
              <div className="form-group">
                <input type="submit" value="Create Printer" className="btn btn-primary" />
              </div>
            </form>
        </div>
        )
    }
}