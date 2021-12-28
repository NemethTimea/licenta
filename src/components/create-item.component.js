import React, { Component } from 'react';

export default class CreateItem extends Component{
    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeOwner = this.onChangeOwner.bind(this);
        this.onChangeDimensions = this.onChangeDimensions.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: "",
            description: "",
            category: [],
            owner: "",
            dimensions: "",
            color: "",
            size: [],
        }
    }

    componentDidMount(){
        this.setState({
            category: ['Art','Engineering', 'Animals', 'Buildings&Structures'],
            size: ["Small", "Middle", "Big"]
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
    onChangeOwner(e){
        this.setState({
            owner: e.target.value
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

        const item = {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            owner: this.state.owner,
            dimensions: this.state.dimensions,
            color: this.state.color,
            size: this.state.size,
        }

        console.log(item)

        window.location = '/';
    }

    render(){
        return (
        <div>
            <h3>Create New Item Log</h3>
            <form onSubmit={this.onSubmit}>
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
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.category}
                    onChange={this.onChangeCategory}>
                    {
                      this.state.category.map(function(category) {
                        return <option 
                          key={category}
                          value={category}>{category}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group">
                <label>Owner: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.owner}
                    onChange={this.onChangeOwner}
                    />
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
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.size}
                    onChange={this.onChangeSize}>
                    {
                      this.state.size.map(function(size) {
                        return <option 
                          key={size}
                          value={size}>{size}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group">
                <input type="submit" value="Create Item Log" className="btn btn-primary" />
              </div>
            </form>
        </div>
        )
    }
}