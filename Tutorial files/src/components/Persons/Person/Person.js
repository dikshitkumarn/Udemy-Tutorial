import React , { Component } from 'react';
import classes from './Person.css';
import Auxillary from '../../../hoc/Auxillary'

class Person extends Component {
  render() {
    console.log('Person.js] rendering...')
      return( 
        // <div className={classes.Person}>
        <Auxillary>
            <p key="i1" onClick={this.props.click}>
              I'm {this.props.name} and I am {this.props.age} years old!
            </p>
            <p key="i2" >{this.props.children}</p>
            <input key="i3" type="text" onChange={this.props.changed} value={this.props.name} />
        </Auxillary>
        // </div>
        );
  }
};

export default Person;
