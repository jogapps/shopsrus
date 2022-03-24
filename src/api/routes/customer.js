const express = require("express");
const { createCustomer, getAllCustomers, getCustomerById, getCustomerByName } = require("../controllers/CustomerController");
const { createCustomerMiddleware, getCustomerbyIDMiddleware, getCustomerbyNameMiddleware } = require("../utils/validations/customer");

const router = express.Router();

router.post("/add", createCustomerMiddleware,  createCustomer);
router.get("/all", getAllCustomers);
router.get("/:id", getCustomerbyIDMiddleware, getCustomerById);
router.get("/name/:name", getCustomerbyNameMiddleware, getCustomerByName);

module.exports = router; 