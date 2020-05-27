import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

const Ingredients = () => {

  const [ingredients, setIngredients] = useState([])

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

  // const removeIngredient = 

  return (
    <div className="App">
      <IngredientForm  onAddIngredient = {addIngredient} />

      <section>
        <Search />
        <IngredientList ingredients = {ingredients} />
      </section>
    </div>
  );
}

export default Ingredients;
