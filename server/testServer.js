const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { handleLogin, verifyToken, handleLogout } = require('./util/auth');
const env = process.env.NODE_ENV || 'development';
const http = require('http');


require('dotenv').config({ path: './config.env' });

class testServer {
  constructor() {
    console.log('in constructor')
    this.app = express();
    this.router = express.Router();
    this.workoutRouter = require('./routes/workout_tasks');
    this.userRouter = require('./routes/user');
    this.clientRouter = require('./routes/client');
    this.pTRouter = require('./routes/pt');
    this.port = 8080 //use for test stuff
    this.db = process.env.ATLAS_URI;

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/', this.router);
    this.app.use('/workouts', this.workoutRouter);
    this.app.use('/user', this.userRouter);
    this.app.use('/client', this.clientRouter);
    this.app.use('/pt', this.pTRouter);

    console.log('constructed')
  }

  openConnection() {
    //mongo connection
    this.mongoose = mongoose;
    this.mongoose.connect(this.db, { useNewUrlParser: true });

    this.connection = this.mongoose.connection;
    this.connection.once('open', () => {
      console.log('mongo db connection established');
    });

    //server connection
    this.server = http.createServer(this.app)
    this.app.listen(this.port, () => {
      // perform a database connection when server starts
      console.log(`Server is running on port: ${this.port}`);
    });
    
    this.router.post('/auth', handleLogin);
    this.router.post('/logout', verifyToken, handleLogout);
  }

  closeConnection(done=null) {
    this.server.close();
    this.mongoose.connection.close(done);
  }

  getServer() {
    return this.server
  }
};

module.exports = { testServer };
