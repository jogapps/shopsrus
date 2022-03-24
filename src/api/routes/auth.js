const express = require("express");
const { login } = require("../controllers/LoginController");
const { loginMiddleware } = require("../utils/validations/login");

const router = express.Router();

router.post("/", loginMiddleware, login);

module.exports = router; 