import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/recipesDB";

mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error:", err));

const recipeSchema = new mongoose.Schema({
  title: String,
  cuisine: String,
  rating: Number
});

const Recipe = mongoose.model("Recipe", recipeSchema);

async function run() {
  await Recipe.create({ title: "Bagel Fusion", cuisine: "New York Fusion", rating: 4.8 });
  const recipes = await Recipe.find();
  console.log(recipes);
}

run();