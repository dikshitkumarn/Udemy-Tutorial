import React , { Component , Fragment } from 'react';
import classes from './Person.css';
import Auxillary from '../../../hoc/Auxillary'
import withClass from '../../../hoc/withClass'
import PropTypes from 'prop-types'

class Person extends Component {

  constructor(props){
    super(props)
    this.reference=React.createRef()
  }

  componentDidMount(){
    this.reference.current.focus()
  }

  render() {
    console.log('Person.js] rendering...')
      return( 
        <Auxillary>
              <p key="i1" onClick={this.props.click}>
                I'm {this.props.name} and I am {this.props.age} years old!
              </p>
              <p key="i2" >{this.props.children}</p>
              <input 
                key="i3" 
                ref={this.reference}
                type="text" 
                onChange={this.props.changed} 
                value={this.props.name} 
              />
        </Auxillary>
        // <div className={classes.Person}></div>
        );
  }
};

Person.propTypes={
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}

export default withClass(Person,classes.Person);
