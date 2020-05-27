import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

const Ingredients = () => {

  const [ingredients, setIngredients] = useState([])
  useEffect(() => {
    fetch('https://react-hooks-a4367.firebaseio.com/ingredients.json')
    .then(res => {
      return res.json()
    })
    .then(resData => {
      console.log(resData)
      let ingredientsArray = []
      for (const key in resData){
        ingredientsArray.push({
          id:key,
          ...resData[key]
        })
      }
      setIngredients(ingredientsArray)
    })
  }, [])

  useEffect(() => {
    console.log("Entered")
  }, [ingredients])  

  const addIngredient = ingredient => {
    fetch('https://react-hooks-a4367.firebaseio.com/ingredients.json',{
      method: 'POST',
      headers: {'Context-Type': 'application/json'},
      body: JSON.stringify(ingredient)
    }).then(res => {
        return res.json()
    }).then(resData => {
        setIngredients(prevState => [...prevState, {id: resData.name, ...ingredient}])
    })
  }

  const filteredIngredients = (filteredIngredientsArray) => {
    setIngredients(filteredIngredientsArray)
  }

  return (
    <div className="App">
      <IngredientForm  onAddIngredient = {addIngredient} />

      <section>
        <Search onUpdate={filteredIngredients} />
        <IngredientList ingredients = {ingredients} />
      </section>
    </div>
  );
}

export default Ingredients;
