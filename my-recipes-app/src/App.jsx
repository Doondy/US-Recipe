import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/US_recipes.json')
      .then((res) => res.json())
      .then((data) => {
        const cleanNumeric = (value) => {
          const num = Number(value);
          return isNaN(num) ? null : num;
        };

        const cleaned = data.map((recipe) => ({
          ...recipe,
          rating: cleanNumeric(recipe.rating),
          prep_time: cleanNumeric(recipe.prep_time),
          cook_time: cleanNumeric(recipe.cook_time),
          total_time: cleanNumeric(recipe.total_time),
          nutrients: recipe.nutrients || {},
        }));

        setRecipes(cleaned);
      })
      .catch((err) => console.error("Failed to load recipes:", err));
  }, []);

  return (
    <div>
      <h1>US Recipes</h1>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <strong>{recipe.title}</strong> ({recipe.cuisine})<br />
            <em>{recipe.description}</em><br />
            <p>
              ⭐ Rating: {recipe.rating ?? 'N/A'}<br />
              🕒 Prep: {recipe.prep_time ?? 'N/A'} mins | Cook: {recipe.cook_time ?? 'N/A'} mins | Total: {recipe.total_time ?? 'N/A'} mins<br />
              🍽️ Serves: {recipe.serves ?? 'N/A'}
            </p>
            {recipe.nutrients && Object.keys(recipe.nutrients).length > 0 && (
              <p>
                <strong>Nutrients:</strong><br />
                Calories: {recipe.nutrients.calories ?? 'N/A'} | 
                Fat: {recipe.nutrients.fat ?? 'N/A'}g | 
                Carbs: {recipe.nutrients.carbohydrates ?? 'N/A'}g | 
                Protein: {recipe.nutrients.protein ?? 'N/A'}g
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;