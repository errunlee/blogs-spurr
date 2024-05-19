const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReportSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  timesReported: {
    type: Number,
    required: false,
  },
});
const Reported = mongoose.model("report", ReportSchema);
module.exports = Reported;
