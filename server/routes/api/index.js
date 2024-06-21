const router = require("express").Router();
const verifyJWT = require("../../middleware/authMiddleware");

router.use("/auth", require("./authRoutes"));
// router.use("/otp", require("./verifyOtpRoutes"));
router.use("/user", verifyJWT, require("./userRoutes"))

module.exports = router;
