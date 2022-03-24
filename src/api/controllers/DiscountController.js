const Sequelize = require("sequelize");

const { Discount } = require("../models");
const { errorMessage } = require("../utils/responses/error");
const { successMessage } = require("../utils/responses/success");

const Op = Sequelize.Op;

exports.createDiscount = (req, res) => {
    const { desc, type, apply_method, value } = req.body;
    // Validate value based on apply method using format of 50% || 100:5
    if(apply_method === "PERC" && (isNaN(value) || Number(value) > 100)) errorMessage(res, "Enter valid percentage amount")
    else if(apply_method === "VALUE" && (!value.includes(":"))) errorMessage(res, "Enter valid amount of format like 100:5")
    else {
        Discount.create({
            desc, 
            type: type.toUpperCase(),
            application: apply_method,
            value
        })
            .then(createdDiscount => successMessage(res, "Discount created Successfully!", createdDiscount))
            .catch(error => errorMessage(res, `${error}`));
    }
}

exports.getAllDiscount = (req, res) => {
    Discount.findAll({ raw: false})
        .then(discounts => successMessage(res, "Discounts fetched Successfully!", discounts))
        .catch(error => errorMessage(res, `${error.message}`));
}


exports.getDiscountByType = (req, res) => {
    const { type } = req.params;
    Discount.findOne({ 
        where: {
            type: {
                [Op.like]: `%${type.toUpperCase()}%`
            }
        }
     })
        .then(discount => {
            if(discount) successMessage(res, "Discount fetched Successfully!", discount)
            else errorMessage(res, `Discount not found!`)
        })
        .catch(error => errorMessage(res, `${error.message}`));
}

