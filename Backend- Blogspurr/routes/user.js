const express = require("express");
const router = express.Router();
const fetcuser = require("../middleware/fetcuser");
const Users = require("../models/User");
const { body, validationResult } = require("express-validator");
const Reported = require("../models/Report");

//fetch notes from db
router.get("/getAllUsers", fetcuser, async (req, res) => {
  console.log("req");
  const users = await Users.find();
  res.json(users);
});

router.get("/getUserById/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findById(id);

  const report = await Reported.find({ uid: id });
  let noOfReports = 0;
  report?.map((each) => {
    noOfReports += each?.timesReported;
  });

  res.json({ user, noOfReports });
});

router.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByIdAndDelete(id);
  res.json(user);
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
