const jwt = require("jsonwebtoken");


const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({
        message: "Ur not authorized",
        success: false,
      });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        //invalid token
        return res.status(403).json({
          message: "Forbidden",
          success: false,
        });
      }
      req.user = decoded.username;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error ${error}`,
      success: false,
    });
  }
};

module.exports = verifyJWT;
