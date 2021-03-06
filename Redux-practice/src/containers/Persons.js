import React, { Component } from 'react';
import { connect } from "react-redux";

import * as actionTypes from "../store/actions";
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {

    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onpersonAddedHandler} />
                {this.props.newPersons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onpersonDeletedHandler(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        newPersons: state.persons,
    }
}

const mapStatetoDispatch = (dispatch) => {
    return {
        onpersonAddedHandler: (name,age) => dispatch({type: actionTypes.ADD_PERSON, personData:{name: name, age: age}}),
        onpersonDeletedHandler: (id) => dispatch({type: actionTypes.DELETE_PERSON, id: id})
    }
}

export default connect(mapStateToProps, mapStatetoDispatch)(Persons);