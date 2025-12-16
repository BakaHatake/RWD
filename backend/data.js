require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGO;
const client = new MongoClient(url);

async function run() {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("Rwd");
    const items = db.collection("items");

    const data = await items.find({ category: "Quick Bites" }).toArray();
    console.log("Items:", data);

    await client.close();
}

run();
