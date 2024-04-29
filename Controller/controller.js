// Controller/controller.js
async function getAllCats(collection) {
  try {
    const formData = await collection.find({}).toArray();
    return { data: formData };
  } catch (err) {
    throw err;
  }
}

async function saveCat(collection, formData) {
  try {
    await collection.insertOne(formData);
    return { message: 'Form data saved successfully' };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllCats,
  saveCat
};
