const express = require("express");
const router = express.Router();

router.use("/secufleet", require("./api"));

router.get("/", (req, res) => {
  res.send("Connected to main Route");
});
module.exports = router;
