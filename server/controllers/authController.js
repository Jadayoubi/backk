require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel'); // Adjust the path as per your application

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '60d'; // Token expiration time

class Controller {
  hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error(`Hashing error: ${error.message}`);
    }
  };

  signup = async (req, res) => {
    try {
      const hashedPassword = await this.hashPassword(req.body.password);
      const newUser = await user.create({
        ...req.body,
        isVerified: false,
        password: hashedPassword,
      });
      return res.status(201).json({
        message: "User created successfully",
        success: true,
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  };

  login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userLogin = await user.findOne({ email });

        if (!userLogin) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        if (userLogin.isDeleted) {
            return res.status(403).json({
                message: "This Account Is Forbidden",
                success: false,
            });
        }

        // Compare passwords
        if (await bcrypt.compare(password, userLogin.password)) {
            // Generate JWT token with role information
            const token = jwt.sign(
                { email: userLogin.email, role: userLogin.role },
                process.env.JWT_SECRET,
                { expiresIn: '60d' } // Token expiry time (e.g., 60 days)
            );

            return res.status(200).json({
                message: "User Logged In",
                success: true,
                token: token, // Return the token
                data: { email: userLogin.email },
            });
        } else {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false,
            });
        }
    } catch (error) {
        console.error(`Login error: ${error.message}`);
        return res.status(500).json({
            message: `Error: ${error.message}`,
            success: false,
        });
    }
};

  logout = async (req, res) => {
    try {
      // There isn't a specific 'destroy' action needed for JWT on the server
      // Simply clear the token on the client side
      return res.status(200).json({
        message: "User Logged Out",
        success: true,
      });
    } catch (error) {
      console.error(`Logout error: ${error.message}`);
      return res.status(500).json({
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  };
  
  authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({
        message: "Access denied, token missing!",
        success: false,
      });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Attach the decoded token to the request object
      next();
    } catch (error) {
      return res.status(403).json({
        message: "Token is not valid",
        success: false,
      });
    }
  };
}

const controller = new Controller();
module.exports = controller;
