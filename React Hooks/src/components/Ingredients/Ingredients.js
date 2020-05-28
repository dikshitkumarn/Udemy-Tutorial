import React, {useReducer, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'
import Modal from '../UI/ErrorModal'

const ingredientReducer = (intialIngredients, action) => {
  switch(action.type){
    case ('ADD'):
      return [...intialIngredients, action.newIngredient]
    case ('DELETE'):
      return intialIngredients.filter(ing => ing.id !== action.id)
    case ('SET'):
      return [...action.filteredIngredients]
    default:
      throw new Error("Don't Enter this")
  }
}

const httpReducer = (oldState, action) => {
  switch(action.type){
    case ('START'):
      return {loading: true, error: null }
    case ('SUCCESS'):
      return {...oldState, loading: false}
    case ('FAILURE'):
      return {loading: false, error: action.errorMessage}
    case ('MODAL_CLOSE'):
      return {loading: false, error: null}
    default:
      throw new Error( "Don't reach here" )
  }
}

const Ingredients = () => {

  const [ingredients, dispatch] = useReducer(ingredientReducer, [])
  const [currentHttpStage, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null})
  // const [ingredients, setIngredients] = useState([])
  // const [isLoading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  const addIngredient = ingredient => {
    dispatchHttp({type: "START"})
    fetch('https://react-hooks-a4367.firebaseio.com/ingredients.json',{
      method: 'POST',
      headers: {'Context-Type': 'application/json'},
      body: JSON.stringify(ingredient)
    }).then(res => {
      dispatchHttp({type: "SUCCESS"})
        return res.json()
    }).then(resData => {
        // setIngredients(prevState => [...prevState, {id: resData.name, ...ingredient}])
        dispatch({type: 'ADD', newIngredient: {id: resData.name, ...ingredient}})
    }).catch(error => {
      dispatchHttp({type: "FAILURE", errorMessage: "Something went wrong"})
    })
  }

  const removeIngredient = id => {
    dispatchHttp({type: 'START'})
    fetch(`https://react-hooks-a4367.firebaseio.com/ingredients/${id}.json`,{
      method: 'DELETE'
    })
    .then(res => {
      dispatchHttp({type: 'SUCCESS'})
      // setIngredients(prevIngredients => prevIngredients.filter(curr => curr.id !== id))
      dispatch({type: 'DELETE', id: id})
    }).catch(error => {
      dispatchHttp({type: 'FAILURE', errorMessage: "Something went wrong"})
    })
  }

  const filteredIngredients = useCallback((filteredIngredientsArray) => {
    // setIngredients(filteredIngredientsArray)
    dispatch({type: 'SET', filteredIngredients: filteredIngredientsArray})
  },[])

  const modalClose = () => {
    dispatchHttp({type: "MODAL_CLOSE"})
  }

  return (
    <div className="App">
      {currentHttpStage.error && <Modal onClose={modalClose} > {currentHttpStage.error} </Modal>}
      <IngredientForm isLoading={currentHttpStage.loading} onAddIngredient = {addIngredient} />

      <section>
        <Search onUpdate={filteredIngredients} />
        <IngredientList removeIngredient={removeIngredient} ingredients = {ingredients} />
      </section>
    </div>
  );
}

export default Ingredients;
