const express = require("express"); // import the express library
const mongoose = require("mongoose"); // import mongoose
const app = express(); // create express app
const cors = require("cors"); // bypass origin
const morgan = require("morgan"); // get response in the console
const helmet = require("helmet"); // secure the response
const PostRouter = require("./Posts/Posts"); // import routes

app.use(cors());
app.use(morgan());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const url =
  "mongodb+srv://RAWDHA:xfsmv689@cluster0.tyez5a4.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => {
    console.log("Mongoose is now connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", PostRouter); //

app.use("*", (req, res) => {
  // handle error
  res.send("Route not found");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server is work on port 3000");
});
