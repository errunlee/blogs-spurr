const express = require("express");
const router = express.Router();
const fetcuser = require("../middleware/fetcuser");
const Users = require("../models/User");
const { body, validationResult } = require("express-validator");
const Reported = require("../models/Report");

//fetch notes from db
router.get("/getAllUsers", fetcuser, async (req, res) => {
  console.log("req");
  const blogs = await Users.find();
  res.json(blogs);
});

router.get("/getreports", fetcuser, async (req, res) => {
  const reports = await Reported.find();
  res.json(reports);
});
router.post(
  "/report/:id",
  fetcuser,
  [body("id"), body("uid")],
  async (req, res) => {
    const { id, uid } = req.body;

    const post = await Reported.findOne({ postId: id });

    if (post) {
      post.timesReported++;
      post.save();
      res.json(post);
    } else {
      const newReport = new Reported({
        postId: id,
        uid: uid,
        timesReported: 1,
      });

      const savedReport = newReport.save();
      res.json(savedReport);
    }
  }
);

module.exports = router;
