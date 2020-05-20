import * as actionTypes from './actionTypes'

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const deleteIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const fetchIngredients = (ingredients) =>{
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }
}
export const initIngredients = (axios) => {
    return dispatch => {
        axios.get('https://my-burger-builder-c4e24.firebaseio.com/ingredients.json')
        .then(res => {
            dispatch(fetchIngredients(res.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed(error))
        } )
    }
}