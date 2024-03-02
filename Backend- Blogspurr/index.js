const connectToMongo = require("./db");
var cors = require("cors");

connectToMongo();

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.listen(port, () => {
  console.log(`Notebook app listening on port ${port}`);
});

//routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/", (req, res) => {
  res.send("om");
});
