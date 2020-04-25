import React , { Component , Fragment } from 'react';
import classes from './Person.css';
import Auxillary from '../../../hoc/Auxillary'

class Person extends Component {
  render() {
    console.log('Person.js] rendering...')
      return( 
        // <div className={classes.Person}>
        <Fragment>
            <p key="i1" onClick={this.props.click}>
              I'm {this.props.name} and I am {this.props.age} years old!
            </p>
            <p key="i2" >{this.props.children}</p>
            <input key="i3" type="text" onChange={this.props.changed} value={this.props.name} />
        </Fragment>
        // </div>
        );
  }
};

export default Person;
