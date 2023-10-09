const express = require("express");

require("dotenv").config();

const mongoose = require("mongoose");

const app = express();

const cors = require("cors");

app.use(cors());

const { PORT = 3001 } = process.env;

app.listen(PORT, () => console.log(`app listening in port: ${PORT}`));

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) =>
  console.log(`DB error ${r}`),
);
const routes = require("./routes");

app.use(express.json());
app.use(cors());

// temporary middleware
// app.use((req, res, next) => {
//   req.user = {
//     _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
//   };
//   next();
// });

app.use(routes);
