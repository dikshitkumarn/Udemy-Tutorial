import React, { Component } from 'react'
import { connect } from "react-redux";

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    // state={
    //     ingredients : null,
    //     price:0
    // }

    // componentWillMount = () => {
    //     const params = new URLSearchParams(this.props.location.search)
    //     const ingredients = {} 
    //     let price
    //     for (let i of params.entries()){
    //         if(i[0] === "price" ){
    //             price = +i[1]
    //         }
    //         else{
    //             ingredients[i[0]] = +i[1]
    //         }
    //     }
    //     this.setState({ingredients:ingredients, price: price})
    // }
    // ,
    // purchased: state.order.purchased
    checkoutCancelled = () => {
        this.props.history.goback()
    }

    checkoutContinued = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    render(){
        let summary = <Redirect to="/" />
        if(this.props.ingredients && !this.props.purchased ){
            summary = (
                <div>
                    <CheckoutSummary 
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued}
                        ingredients={this.props.ingredients} 
                    />
                    <Route path={ this.props.match.path + '/contact-data' } component={ContactData} />
                </div>
                )
        }
        return summary
    }
}

const mapPropsToState = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapPropsToState)(Checkout)