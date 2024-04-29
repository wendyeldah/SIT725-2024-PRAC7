// Routes/routes.js
const express = require('express');
const router = express.Router();
const controller = require('../Controller/controller');

module.exports = function(collection) {
  router.get('/cats', async (req, res) => {
    try {
      const result = await controller.getAllCats(collection);
      res.status(200).json(result);
    } catch (err) {
      console.error("Error fetching form data:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/cats', async (req, res) => {
    try {
      const formData = req.body;
      const result = await controller.saveCat(collection, formData);
      res.status(200).json(result);
    } catch (err) {
      console.error("Error saving form data:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  return router;
};
