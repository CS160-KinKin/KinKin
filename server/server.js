const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { handleLogin, verifyToken, handleLogout } = require('./util/auth');

require('dotenv').config({ path: './config.env' });

const app = express();
const router = express.Router();
const workoutRouter = require('./routes/workout_tasks');
const userRouter = require('./routes/user');
const clientRouter = require('./routes/client');
const pTRouter = require('./routes/pt');
const healthDataRouter = require('./routes/health_data');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use('/', router);
app.use('/workouts', workoutRouter);
app.use('/user', userRouter);
app.use('/client', clientRouter);
app.use('/pt', pTRouter);
app.use('/healthdata', healthDataRouter);

const db = process.env.ATLAS_URI;
mongoose.connect(db, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('mongo db connection established');
});

router.post('/auth', handleLogin);
router.post('/logout', verifyToken, handleLogout);

app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
});
