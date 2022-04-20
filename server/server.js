const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {STATUS_CODES} = require('./util/constants')
const {getGoogleTokenInfo} = require('./util/auth');

require("dotenv").config({ path: "./config.env" });

const app = express();
const router = express.Router();
const workoutRouter = require('./endpoints/routes/workout_tasks')
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/", router);
app.use('/workouts', workoutRouter);

const db = process.env.ATLAS_URI;
mongoose.connect(db, { useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('mongo db connection established')
})

router.post("/auth", async (req, res) => {
  if (!req.body) {
    res.status(STATUS_CODES.BAD_REQUEST).send("Missing tokenId");
    return;
  }
  const googleTokenInfo = await getGoogleTokenInfo(req.body.tokenId);
  if (!googleTokenInfo) {
    res.status(STATUS_CODES.UNAUTHORIZED).send("Invalid token");
    return;
  }
  if (!googleTokenInfo.email_verified) {
    res.status(STATUS_CODES.UNAUTHORIZED).send("Email not verified with Google");
    return;
  }
  const token = jwt.sign(
    {
      email: googleTokenInfo.email,
      userId: googleTokenInfo.sub
    },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    }
  );
  res.status(STATUS_CODES.OK).send({
    email: googleTokenInfo.email,
    name: googleTokenInfo.name, 
    picture: googleTokenInfo.picture,
    token
  });
});

app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
});
