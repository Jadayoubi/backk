const user = require("../models/userModel");


class Controller {
    getAllUsers = async (req, res) => {
        try {
            const AllUsers = await user.find({})
            return res.status(200).json({
                message: "Users retrieved Successfully",
                success: true,
                data: AllUsers
            })
        } catch (error) {
            return res.status(500).json({
                message: `Error ${error}`,
                success: false
            })
        }
    }
    getUserById = async (req, res) => {
        try {
            const { _id } = req.body
            const userById = await user.findById(_id);
            if (!userById) {
                return res.status(404).json({
                    message: "User Not Found",
                    success: false
                })
            }
            return res.status(200).json({
                message: "User Retrieved Successfully",
                success: true,
                data: userById
            })
        } catch (error) {
            return res.status(500).json({
                message: `Error ${error}`,
                success: false
            })
        }
    }
    deleteUserById = async (req, res) => {
        try {
            const { _id } = req.body
            let userToBeDeleted = await user.findByIdAndDelete(_id)
            if (!userToBeDeleted) {
                return res.status(404).json({
                    message: "User NOt Found",
                    success: false
                })
            }
            return res.status(200).json({
                message: "User Deleted Successfully",
                success: true
            })
        } catch (error) {
            return res.status(500).json({
                message: `Error ${error}`,
                success: false
            })
        }
    }

}
const controller = new Controller();
module.exports = controller;