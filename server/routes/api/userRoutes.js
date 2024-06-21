const router = require("express").Router()
const controller = require("../../controllers/userController")


router.get("/get-all-users", controller.getAllUsers)
router.get("/get-user-by-id", controller.getUserById)
router.delete("/delete-user-by-id", controller.deleteUserById)




module.exports = router;