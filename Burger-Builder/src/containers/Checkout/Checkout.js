import React, { Component } from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {

    state={
        ingredients : {
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

    componentDidMount = () => {
        const params = new URLSearchParams(this.props.location.search)
        const ingredients = {} 
        for (let i of params.entries()){
            ingredients[i[0]] = +i[1]
        }
        this.setState({ingredients:ingredients})
    }

    checkoutCancelled = () => {
        this.props.history.goback()
    }

    checkoutCancelled = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    render(){
        console.log(this.props)
        return (
            <div>
                <CheckoutSummary 
                  checkoutCancelled={this.checkoutCancelled}
                  checkoutContinued={this.checkoutCancelled}
                  ingredients={this.state.ingredients} 
                  />
            </div>
        )
    }
}

export default Checkout