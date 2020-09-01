const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const routers = require("./routes/routers");
app.use("/add", routers);

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});
mongoose.connection.on("Error", (err) => {
  console.log({ message: err });
});

const port = process.env.PORT | 8080;
app.listen(port, () => {
  console.log(`server running on port :${port}`);
});
