import React, { Component } from 'react';
import { connect } from "react-redux";

import Aux from '../../hoc/_Aux/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as Actions from '../../store/actions/index'
import { withRouter } from 'react-router-dom';


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false
    }

    componentDidMount = () => {
        this.props.onInitIngredients(this.props.authToken)
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0  ;
    }

    // addIngredientHandler = ( type ) => {
    //     const oldCount = this.props.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState( { totalPrice: newPrice} );
    //     this.updatePurchaseState(this.props.ingredients);
    // }

    // removeIngredientHandler = ( type ) => {
    //     const oldCount = this.props.ingredients[type];
    //     if ( oldCount <= 0 ) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState( { totalPrice: newPrice } );
    //     this.updatePurchaseState(this.props.ingredients);
    // }

    purchaseHandler = () => {
        const isAuth = this.props.authToken != null
        isAuth?
        this.setState({purchasing: true}) : 
        this.props.history.push("/auth")
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // const queryparams = []
        // for(let i in this.props.ingredients){
        //     queryparams.push( encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]) )
        // }
        // queryparams.push("price=" + this.props.totalPrice )
        // const queryString = queryparams.join('&')
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: "?" + queryString
        // })
        this.props.onOrderSubmitStarted()
        this.props.history.push('/checkout')
    }

    render () {
        const isAuth = this.props.authToken != null
        const disabledInfo = {
            ...this.props.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let ordersummary = null
        
        let burger = this.props.error ? <p>Ingredients cannot be Loaded!</p> : <Spinner />
        if(this.props.ingredients){
        burger = (
            <Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    isAuth= {isAuth}
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemoved={this.props.onDeleteIngredient}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler}
                    price={this.props.totalPrice} />
            </Aux>
        )
        ordersummary = <OrderSummary 
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} 
        />
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        error: state.burgerBuilder.error, 
        totalPrice: state.burgerBuilder.totalPrice,
        authToken: state.auth.token
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        onAddIngredient: (ingredientName) => dispatch(Actions.addIngredient(ingredientName)),
        onDeleteIngredient: (ingredientName) => dispatch(Actions.deleteIngredient(ingredientName)),
        onInitIngredients: (authToken) => dispatch(Actions.initIngredients(authToken)),
        onOrderSubmitStarted: () => dispatch(Actions.orderSubmitStarted())
    }
}

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(withErrorHandler(BurgerBuilder, axios)));