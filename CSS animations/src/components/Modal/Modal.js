import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition'
// import Transition from 'react-transition-group/Transition'

import './Modal.css';

const animationTime = {
    enter: 1000,
    exit: 1000
}

// CSS Transition

const modal = (props) => {

    return(
        <CSSTransition in={props.show} timeout={animationTime} mountOnEnter unmountOnExit classNames="fade-slide" >
            <div className={"Modal"}>
                <h1>A Modal</h1>
                <button className="Button" onClick={props.closed}>Dismiss</button>
            </div>
        </CSSTransition>
        
    );
}


// Transition

// const modal = (props) => {
     
//     return(
//         <Transition in={props.show} timeout={animationTime} mountOnEnter unmountOnExit >
//             {
//                 state => {
//                     const classes = [
//                         "Modal",
//                         state === "entering" ? "ModalOpen" : state === 'exiting' ? "ModalClose" : null
//                     ]
//                     return (
//                         <div className={classes.join(' ')}>
//                             <h1>A Modal</h1>
//                             <button className="Button" onClick={props.closed}>Dismiss</button>
//                         </div>
//                     )
//                 }
//             }
//         </Transition>
        
//     );
// }


export default modal;