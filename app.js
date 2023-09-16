const express = require("express");

const mongoose = require("mongoose");

const app = express();

const { PORT = 3001 } = process.env;

app.listen(PORT, () => console.log(`app listening in port: ${PORT}`));

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) =>
  console.log(`DB error ${r}`),
);
const routes = require("./routes");

app.use(express.json());

app.use(routes);
