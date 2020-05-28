import React, {useReducer, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'
import Modal from '../UI/ErrorModal'
import useHttpHook from '../Hooks/httpHook';


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



const Ingredients = () => {

  const [ingredients, dispatch] = useReducer(ingredientReducer, [])
  const {isLoading, error, data, sendRequest} = useHttpHook()
  // const [ingredients, setIngredients] = useState([])
  // const [isLoading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  const addIngredient = useCallback(ingredient => {
    dispatch({type: "START"})
      fetch(`https://react-hooks-a4367.firebaseio.com/ingredients.json`,{
        method: "POST",
        headers: {'Context-Type': 'application/json'},
        body: JSON.stringify(ingredient)
      }).then(res => {
        dispatch({type: "SUCCESS"})
          return res.json()
      }).then(resData => {
          // setIngredients(prevState => [...prevState, {id: resData.name, ...ingredient}])
          dispatch({type: 'ADD', newIngredient: {id: resData.name, ...ingredient}})
      }).catch(error => {
        dispatch({type: "FAILURE", errorMessage: "Something went wrong"})
      })}, [])
 

  const removeIngredient = useCallback(id => {
    let url = `https://react-hooks-a4367.firebaseio.com/ingredients/${id}.json`
    sendRequest(url, "DELETE")
  }, [sendRequest])

  const filteredIngredients = useCallback((filteredIngredientsArray) => {
    // setIngredients(filteredIngredientsArray)
    dispatch({type: 'SET', filteredIngredients: filteredIngredientsArray})
  },[])

  const modalClose = () => {
    // dispatchHttp({type: "MODAL_CLOSE"})
  }

  const ingredientList = useMemo(() => {
    return <IngredientList removeIngredient={removeIngredient} ingredients = {ingredients} />
  }, [removeIngredient, ingredients])

  return (
    <div className="App">
      {error && <Modal onClose={modalClose} > {error} </Modal>}
      <IngredientForm isLoading={isLoading} onAddIngredient = {addIngredient} />

      <section>
        <Search onUpdate={filteredIngredients} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
