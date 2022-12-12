const express = require("express")
const router = express.Router()

const controller = require("../controllers/userController")
const authController = require("../controllers/authController")
const { checkAuth } = require("../middlewares/auth")

router.get("/all", checkAuth, controller.all)
router.post("/create", controller.createUser)
router.patch("/update", controller.updateOne)
router.post("/login", authController.login)

module.exports = router