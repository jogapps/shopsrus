const express = require("express");
const moment = require("moment");
const { checkToken } = require("../middlewares/jwt_middleware");
const { route } = require("./auth");
const router = express.Router();

// routes
const authRoute = require("./auth");
const customerRoute = require("./customer");
const discountRoute = require("./discount");
const invoiceRoute = require("./invoice");

const apiVersion = "1.0.0";

// console log every visited route
router.use((req, res, next) => {
    console.log(`${moment()}: ${req.originalUrl}`);
    next();
});

router.use("/login", authRoute);
router.use("/customer", checkToken, customerRoute);
router.use("/discount", checkToken, discountRoute);
router.use("/invoice", checkToken, invoiceRoute);

router.get("/", (req, res) => {
    successMessageWelcome(res, `Welcome to the SHOPSRUS API - v${apiVersion}`);
});

module.exports = router; 