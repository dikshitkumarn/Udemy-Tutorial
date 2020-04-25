import React , { useEffect, useRef, useContext } from 'react'
import classes from './Cockpit.css'
import AuthContext from '../../context/AuthContext'
const Cockpit = props => {

  const reference=useRef(null)
  const context = useContext(AuthContext)
    useEffect( () => {
      console.log("[Cockpit.js] useEffect()")
      // setTimeout( () => alert("Jaga Cries!!") , 1000 )
      reference.current.click()
      console.log(context.authentication)
      //http: ... 
      return ( () => { console.log('[Cockpit.js] cleaned up!') }  )
    } ,[] )

    useEffect( () => {
      console.log('[Cockpit.js] 2nd useEffect()')
      return ( () => { console.log('[Cockpit.js] 2nd cleaned up!') }  )
    } )

    const assignedClasses = [];
    let btnClass=''
    if ( props.showPersons ) {
        btnClass = classes.Red;
    }
    if (props.personsLength <= 2) {
      assignedClasses.push(classes.red); // classes = ['red']
    }
    if (props.personsLength <= 1) {
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }
    return(
        <div className={classes.Cockpit} >
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button ref={reference} className={btnClass} onClick={props.Click}>
            Toggle Persons
            </button>
           <button onClick={context.login} >login</button>
        </div>
    )
}

export default React.memo(Cockpit)