import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
    state = {
        name: '',
        age: ""
    }

    ChangedHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    
    render(){
        return (
            <div className="AddPerson">
                <input type="text" value={this.state.name} name="name" onChange={this.ChangedHandler} />
                <input type="number" value={this.state.age} name="age" onChange={this.ChangedHandler} />
                <button onClick={() => this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
            </div>
        )
    }
}
export default AddPerson;