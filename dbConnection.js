// dbConnection.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://wendyapiyo:6NGvYlfFhiSQ8mQ2@cluster0.mkqhbgb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db().collection('FormData');
    console.log("Connected to MongoDB");
    return collection; 
  } catch (ex) {
    console.error("Error connecting to MongoDB:", ex);
    throw ex;
  }
}

module.exports = {
  runDBConnection
};
