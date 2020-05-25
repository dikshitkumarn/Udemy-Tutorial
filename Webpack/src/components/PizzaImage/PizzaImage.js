import React from 'react'

import classes from './PizzaImage.css'
import PizzaImage from '../../assests/PizzaImage.jpg'

const pizzaImage = (props) = (
    <div classsname={classes.PizzaImage} >
        <img src={PizzaImage} className={classes.PizzaImg} />
    </div>
)

export default pizzaImage