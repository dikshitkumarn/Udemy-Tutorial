import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const [searchValue, setSearchValue] = useState("")
  const { onUpdate } = props

  useEffect(() => {
    const query = searchValue.length === 0 ? '' : `?orderBy="title"&equalTo="${searchValue}"`
    fetch('https://react-hooks-a4367.firebaseio.com/ingredients.json' + query )
    .then(res => {
      return res.json()
    })
    .then(resData => {
      let ingredientsArray = []
      for (const key in resData){
        ingredientsArray.push({
          id:key,
          ...resData[key]
        })
      }
      onUpdate([...ingredientsArray])
    })
  }, [searchValue, onUpdate])

  const updateSearchValue = (event) => {
    setSearchValue(event.target.value)
  }
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={searchValue} onChange={event => updateSearchValue(event)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
