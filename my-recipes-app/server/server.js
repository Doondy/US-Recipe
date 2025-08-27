import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // or Atlas URI
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("recipesDB");
    const collection = db.collection("recipes");

    // Example: insert one recipe
    await collection.insertMany([{
      title: "Pizza with Kimchi",
      cuisine: "New York Fusion",
      rating: 4.7
    },{
        title: "Bagel with Lox and Wasabi Cream Cheese",
        cuisine: "New York Fusion",
        rating: 4.8

    },{
        title: "Cornbread",
        cuisine: "Southern",
        rating: 4.8
    },{
        title: "Barbecue",
        cuisine: "Southern",
        rating: 4.8
        
    },{
        title: "Avocado Sushi Burrito",
        cuisine: "West Coast Fusion",
        rating: 4.8

    }]);

    const allRecipes = await collection.find().toArray();
    console.log("Recipes:", allRecipes);
  } catch (err) {
    console.error("❌ MongoDB error:", err);
  } finally {
    await client.close();
  }
}

run();