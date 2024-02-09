const express = require("express");

require("dotenv").config();

const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
const { errors } = require("celebrate");

app.use(cors());
const { PORT = 3001 } = process.env;
const errorHandler = require("./middlewares/error-handler"); // centralized error handler

app.listen(PORT, () => console.log(`app listening in port: ${PORT}`));

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) =>
  console.log(`DB error ${r}`),
);
const routes = require("./routes");

app.use(express.json());
app.use(cors());

app.use(routes);
app.use(errors());
app.use(errorHandler);
