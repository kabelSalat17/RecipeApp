import React, {useEffect,useState} from 'react';
import Recipe from './components/Recipe'
import './App.css';

const App = () => {

  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;
  

  const [recipes,setRecipes] = useState([])
  const [search, setSearch] = useState ("");
  const [query,setQuery] = useState('')

  //mounts data

  useEffect( () => {
    getRecipes(); // function fetch
  }, [query]) //second paramater mounts only once //add parameter to update only when parameter changes

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
  }

  //

  //function to handle changes in input //i can write in input

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  //get search only when finishing //when submit

  const getSearch = e => {
    e.preventDefault(); //avoid refresh
    setQuery(search);
    setSearch("");//clean input
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className= "search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title = {recipe.recipe.label}
        calories = {recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}  
        />
      ))}
      </div>
    </div>
  )
}

export default App;
