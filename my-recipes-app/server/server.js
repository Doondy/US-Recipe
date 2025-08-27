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
    await collection.insertOne({
      title: "Test Recipe",
      cuisine: "Fusion",
      rating: 4.5
    });

    const allRecipes = await collection.find().toArray();
    console.log("Recipes:", allRecipes);
  } catch (err) {
    console.error("❌ MongoDB error:", err);
  } finally {
    await client.close();
  }
}

run();