const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://errunlee:csidb977@cluster0.cxgpwqq.mongodb.net/blogsdb";
mongoose.set("strictQuery", false);
const connectToMongo = async () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected..");
  });
};

module.exports = connectToMongo;
