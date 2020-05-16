import React, { Component } from 'react'

import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: "",
            postalcode: ""
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading:true})
        // alert('You continue!');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Dikshitkumar N',
                address: {
                    street: 'jayam nagar',
                    zipcode: '637208',
                    country: 'India'
                },
                email: 'dikshitkumarn@gmail.com'
            },
            deliverymethod: 'faster'
        }
        axios.post('/orders.json',order)
        .then(res => {
            console.log(res)
            this.setState({loading:false })
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error)
            this.setState({loading:false })
        })
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Name" />
                <Input inputtype="input" type="text" name="email" placeholder="Email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postalcode" placeholder="Postal Code" />
                <Button clicked={(event) => this.orderHandler(event)} btnType="Success" >ORDER</Button>
            </form>
        )
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData} >
                <h4>Contact Details</h4>
                {form}
            </div>
        )
    }
}

export default ContactData