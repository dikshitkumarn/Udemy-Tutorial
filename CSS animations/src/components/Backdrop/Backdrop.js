import React from 'react';

import './Backdrop.css';
import Transition from 'react-transition-group/Transition';

const backdrop = (props) => {

    
    // let classes= ["BackdropClose"]

    return(
        <Transition in={props.show} timeout={3000} mountOnEnter unmountOnExit >
            {
                state => {
                    const classes = ["Backdrop", state === 'entering' ? "BackdropOpen" : state === "exiting" ? "BackdropClose" : null]
                    return (
                        <div className={classes.join(' ')}></div>
                    )
                }
            }
        </Transition>
    );
}
export default backdrop;