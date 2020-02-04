import React, {useEffect, useState} from 'react';
import Recipe from "./recipe";
import './App.css';

const App = () => {

    const APP_ID = "305f5a10";
    const APP_KEY = "410455729d99a77d4fe9b159e8df2de4\t";

    const [recipes, setRecipies] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('chicken');

    useEffect(() => {
        getRecipies();
    }, [query]);

    const getRecipies = async () => {
        const response = await  fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        setRecipies(data.hits);
        console.log(data.hits);
    };

    const updateSearch = e => {
        setSearch(e.target.value);
        console.log(search);
    };

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
    }

    return (
    <div className="App">
        <form onSubmit={getSearch} className="search-form">
            <input className="search-bar" type="text" value={search} onChange={updateSearch} />
            <button className="search-button" type="submit">
                Search
            </button>
        </form>
        {recipes.map(recipe => (
            <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
            />
        ))}
    </div>
  );
}

export default App;
