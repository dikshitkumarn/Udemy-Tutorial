import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

const Ingredients = () => {

  const [ingredients, setIngredients] = useState([])

  const addIngredient = ingredient => {
    setIngredients(prevState => [...prevState, {id: ingredient.title, ...ingredient}])
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
