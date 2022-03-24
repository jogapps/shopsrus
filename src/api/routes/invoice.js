const express = require("express");
const { addInvoice } = require("../controllers/InvoiceController");
const { createInvoiceMiddleware } = require("../utils/validations/invoice");

const router = express.Router();

router.post("/add", createInvoiceMiddleware,  addInvoice);

module.exports = router;