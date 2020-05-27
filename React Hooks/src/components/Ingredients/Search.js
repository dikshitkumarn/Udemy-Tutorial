import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const [searchValue, setSearchValue] = useState("")
  const input = useRef()
  const { onUpdate } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchValue === input.current.value ){
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
          }
          return () => {
            clearTimeout(timer)
          }
        }, 500);
    
  }, [searchValue, onUpdate])

  const updateSearchValue = (event) => {
    setSearchValue(event.target.value)
  }
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={input} type="text" value={searchValue} onChange={event => updateSearchValue(event)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
