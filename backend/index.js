require("dotenv").config();
const express = require("express");
const gymvaultDb = require("./database/database");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const cors = require("cors");
const PORT = 8000;
const apiRoute = require("./routes/apiRoute");
const app = express();
const courseModel = require("./database/models/course")

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload())

gymvaultDb.connect();

app.get("/", (req, res) => { res.send("Connected to API") })

app.use("/api", apiRoute);

app.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});
