import React from 'react';
import Transition from 'react-transition-group/Transition'

import './Modal.css';

const modal = (props) => {
     
    return(
        <Transition in={props.show} timeout={3000} mountOnEnter unmountOnExit >
            {
                state => {
                    const classes = [
                        "Modal",
                        state === "entering" ? "ModalOpen" : state === 'exiting' ? "ModalClose" : null
                    ]
                    return (
                        <div className={classes.join(' ')}>
                            <h1>A Modal</h1>
                            <button className="Button" onClick={props.closed}>Dismiss</button>
                        </div>
                    )
                }
            }
        </Transition>
        
    );
}
export default modal;