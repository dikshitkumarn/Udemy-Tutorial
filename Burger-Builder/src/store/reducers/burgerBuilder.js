import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const addIngredient = (state, action) => {
        let updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
        let updatedIngredients = updateObject(state.ingredients, updatedIngredient)
        let updatedState = {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        }
        return updateObject(state, updatedState)
}

const deleteIngredient = (state, action) => {
        let updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
        let updatedIngs = updateObject(state.ingredients, updatedIng)
        let updatedSt = {
            ingredients: updatedIngs,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        }
        return updateObject(state, updatedSt)
}

const initIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error:false
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error: action.error})
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type){
        case (actionTypes.ADD_INGREDIENT): return addIngredient(state, action)
            
        case (actionTypes.REMOVE_INGREDIENT): return deleteIngredient(state,action)
            
        case (actionTypes.INIT_INGREDIENTS): return initIngredients(state, action)            
                
        case(actionTypes.FETCH_INGREDIENTS_FAILED): return fetchIngredientsFailed(state, action)
                
        default:
            return state
        }
}
export default burgerBuilderReducer