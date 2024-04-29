const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dbConnection = require('./dbConnection');
const catsRoutes = require('./Routes/routes');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server); // Attach Socket.io to HTTP server

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dbConnection.runDBConnection()
  .then(collection => {
    // Pass the collection object to routes
    app.use('/api', catsRoutes(collection));
    
    server.listen(port, () => { // Start server listening
      console.log(`Server is running on port ${port}`);
    });

    io.on('connection', (socket) => {
      console.log('A user connected');
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    // Listen for 'catPosted' event from clients and log the posted cat
    io.on('connection', (socket) => {
      socket.on('catPosted', (cat) => {
        console.log('Cat posted:', cat);
      });
    });
  })
  .catch(error => {
    console.error("Error starting server:", error);
  });

module.exports = app;
