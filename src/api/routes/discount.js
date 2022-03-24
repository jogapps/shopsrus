const express = require("express");
const { createDiscount, getDiscountByType, getAllDiscount } = require("../controllers/DiscountController");
const { createDiscountMiddleware, getDsicountByTypeMiddleware } = require("../utils/validations/discount");

const router = express.Router();

router.post("/add", createDiscountMiddleware,  createDiscount);
router.get("/all", getAllDiscount);
router.get("/:type", getDsicountByTypeMiddleware, getDiscountByType);

module.exports = router; 