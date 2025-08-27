import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Us_recipes.json")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load recipes:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading recipes...</h2>;

  return (
    <div className="container">
      <h1>🍽️ US Fusion Recipes</h1>
      <ul className="recipe-list">
        {recipes.map((recipe, index) => (
          <li key={index} className="recipe-card">
            <h2>{recipe.title}</h2>
            <p><em>{recipe.cuisine}</em></p>
            <p>{recipe.description}</p>
            <p>
              ⭐ <strong>Rating:</strong> {recipe.rating ?? "N/A"} <br />
              🕒 <strong>Prep:</strong> {recipe.prep_time} mins | 
              Cook: {recipe.cook_time} mins | 
              Total: {recipe.total_time} mins <br />
              🍽️ <strong>Serves:</strong> {recipe.serves}
            </p>
            {recipe.nutrients && (
              <div className="nutrients">
                <h4>Nutrients</h4>
                <ul>
                  <li>Calories: {recipe.nutrients.calories}</li>
                  <li>Fat: {recipe.nutrients.fat} g</li>
                  <li>Carbs: {recipe.nutrients.carbohydrates} g</li>
                  <li>Protein: {recipe.nutrients.protein} g</li>
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;