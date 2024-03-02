const jwt = require("jsonwebtoken");
const JWT_SECRET = "arunbruh";

const fetcuser = (req, res, next) => {
  //getting user from jwt and added id to req
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ err: "please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ err: "please authenticate using a valid token" });
  }
};
module.exports = fetcuser;
