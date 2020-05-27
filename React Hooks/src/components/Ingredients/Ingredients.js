import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'
import Modal from '../UI/ErrorModal'

const Ingredients = () => {

  const [ingredients, setIngredients] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addIngredient = ingredient => {
    setLoading(true)
    fetch('https://react-hooks-a4367.firebaseio.com/ingredients.json',{
      method: 'POST',
      headers: {'Context-Type': 'application/json'},
      body: JSON.stringify(ingredient)
    }).then(res => {
      setLoading(false)
        return res.json()
    }).then(resData => {
        setIngredients(prevState => [...prevState, {id: resData.name, ...ingredient}])
    }).catch(error => {
      setLoading(false)
      setError('Something went wrong')
    })
  }

  const removeIngredient = id => {
    setLoading(true)
    fetch(`https://react-hooks-a4367.firebaseio.com/ingredients/${id}.json`,{
      method: 'DELETE'
    })
    .then(res => {
      setLoading(false)
      setIngredients(prevIngredients => prevIngredients.filter(curr => curr.id !== id))
    }).catch(error => {
      setLoading(false)
      setError('Something went wrong')
    })
  }

  const filteredIngredients = useCallback((filteredIngredientsArray) => {
    setIngredients(filteredIngredientsArray)
  },[])

  const modalClose = () => {
    setError(null)
  }

  return (
    <div className="App">
      {error && <Modal onClose={modalClose} > {error} </Modal>}
      <IngredientForm isLoading={isLoading} onAddIngredient = {addIngredient} />

      <section>
        <Search onUpdate={filteredIngredients} />
        <IngredientList removeIngredient={removeIngredient} ingredients = {ingredients} />
      </section>
    </div>
  );
}

export default Ingredients;
