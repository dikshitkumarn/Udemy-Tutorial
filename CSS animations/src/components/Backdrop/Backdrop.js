import React from 'react';

import './Backdrop.css';
import Transition from 'react-transition-group/Transition';

const animationTime = {
    enter: 1000,
    exit: 1000
}

const backdrop = (props) => {

    
    // let classes= ["BackdropClose"]

    return(
        <Transition in={props.show} timeout={animationTime} mountOnEnter unmountOnExit >
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