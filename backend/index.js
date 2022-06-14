require("dotenv").config();
const express = require("express");
const gymvaultDb = require("./database/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8000;
const apiRoute = require("./routes/apiRoute");
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

gymvaultDb.connect();

app.use("/api", apiRoute);

app.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});
