const bcrypt = require('bcrypt');
const user = require('../models/userModel'); // Adjust the path as per your application

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
          // Respond with basic authentication success
          return res.status(200).json({
            message: "User Logged In",
            success: true,
            data: { email: userLogin.email }, // Adjust as needed
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
      // Destroy session on logout
      req.session.destroy();

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
}

const controller = new Controller();
module.exports = controller;
