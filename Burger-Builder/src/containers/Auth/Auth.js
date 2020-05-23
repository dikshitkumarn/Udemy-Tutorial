import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css'
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component{
    state= {
        controls: {
            email         : {
                elementType   : 'input',
                elementConfig : {
                    type          : 'email',
                    placeholder   : 'Mail Address'
                },
                value      : '',
                validation : {
                    required   : true,
                    isEmail    : true
                },
                valid   : false,
                touched : false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value      : '',
                validation : {
                required   : true,
                minLength  : 6
                },
                valid   : false,
                touched : false
            }
        },
        signup: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        // Method 2
        if (!rules) {
            return true;
        }
        //...
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        let updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }

    eventSubmitHandler = (event) => {
        event.preventDefault()
        this.props.onAuthSubmit(this.state.controls.email.value, this.state.controls.password.value, this.state.signup)
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return{
                signup: !prevState.signup
            }
        })
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id     : key,
                config : this.state.controls[key]
            });
        }
        let form = <Spinner />
        if(!this.props.loading){
            form = formElementsArray.map(
                formElement => (
                    <Input 
                        key            = {formElement.id}
                        elementType    = {formElement.config.elementType}
                        elementConfig  = {formElement.config.elementConfig}
                        value          = {formElement.config.value}
                        invalid        = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched        = {formElement.config.touched}
                        changed        = {(event) => this.inputChangedHandler(event, formElement.id)} />
                )
            )
        }

        let error = null
        if(this.props.error){
            error = <p style={{textTransform: "lowercase", color: "red"}} >{this.props.error.message} </p>
        }

        if(this.props.isAuth){
            if(this.props.wasBuilding){
                this.props.history.push("/checkout")
            }
            else
            this.props.history.push("/")
        }

        return(
            <div className={classes.Auth} >
                <h1> {this.state.signup ? "SIGNUP" : "LOGIN"} </h1>
                <form onSubmit={this.eventSubmitHandler} >
                    {form}
                    <Button btnType="Success" clicked= {this.eventSubmitHandler} > Submit </Button>
                </form>
                {error}
                <Button btnType="Danger" clicked={this.switchAuthHandler} >SWITCH TO {this.state.signup ? "SIGNIN" : "SIGNUP" }</Button>
                <Button btnType="Danger" clicked={this.props.onLogOut} >LOG OUT</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuth: state.auth.token,
        wasBuilding: state.burgerBuilder.wasBuilding
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSubmit: (email, password, isSignUp) => dispatch(actions.checkAuth(email, password, isSignUp)),
        onLogOut: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
