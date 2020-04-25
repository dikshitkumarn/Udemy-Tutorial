import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass'
import Auxillary from '../hoc/Auxillary'
import AuthContext from '../context/AuthContext'

class App extends Component {
  state = {
    persons: [
      { id: 'asfa1', name: 'Jaga', age: 28 },
      { id: 'vasdf1', name: 'Dikshit', age: 29 },
      { id: 'asdf11', name: 'Logesh', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter:0,
    authentication: false
  };

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps',props)
    return state
  }

  // componentWillMount(){
  //   console.log('[App.js] componentWillMount')
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  shouldComponentUpdate(nextprops,nextstate){
    console.log('[App.js] shouldComponentUpdate')
    return true
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate')
  }

  

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( (prevState , props) => { return{ persons: persons , changeCounter:prevState.changeCounter+1 } });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  loginHandler = () => {
    this.setState({authentication: true})
  }

  render() {
    console.log('[App.js] render')
    let persons = null;
    if (this.state.showPersons) {
      persons = <Persons 
                  persons={this.state.persons}
                  clicked={this.deletePersonHandler}
                  changed={this.nameChangedHandler}
                />
    }
    return (
      // <withClass classes={classes.App} >
      <Auxillary>
        <AuthContext.Provider value={{authentication: this.state.authentication, login: this.loginHandler}} >
          <button onClick={ () => {this.setState ({showCockpit:false}) } } >Remove Cockpit</button>
          {this.state.showCockpit ?
          <Cockpit 
            title={this.props.apptitle}
            showPersons={this.state.showPersons}
            showCockpit={this.state.showCockpit}
            personsLength={this.state.persons.length}
            Click={this.togglePersonsHandler}
          />: null }
          {persons}
        </AuthContext.Provider>
      </Auxillary>
      // </withClass>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
