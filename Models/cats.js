// Models/cats.js
const { collection } = require('../dbConnection');

async function getFormData() {
  const formData = await collection.find({}).toArray();
  return formData;
}

async function insertData(formData) {
  await collection.insertOne(formData);
}

module.exports = {
  getFormData,
  insertData
};
