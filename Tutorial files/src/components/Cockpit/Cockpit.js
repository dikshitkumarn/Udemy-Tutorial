import React , { useEffect } from 'react'
import classes from './Cockpit.css'

const Cockpit = props => {

    useEffect( () => {
      console.log("[Cockpit.js] useEffect()")
      setTimeout( () => alert("Jaga Cries!!") , 1000 )
      //http: ...
    } ,[props.showPersons] )

    //  useEffect() //multiple useEffects()

    const assignedClasses = [];
    let btnClass=''
    if ( props.showPersons ) {
        btnClass = classes.Red;
    }
    if (props.persons.length <= 2) {
      assignedClasses.push(classes.red); // classes = ['red']
    }
    if (props.persons.length <= 1) {
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }
    return(
        <div className={classes.Cockpit} >
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass} onClick={props.Click}>
            Toggle Persons
            </button>
        </div>
    )
}

export default Cockpit