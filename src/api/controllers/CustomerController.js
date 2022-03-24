const Sequelize = require("sequelize");

const { Customer } = require("../models");
const { errorMessage } = require("../utils/responses/error");
const { successMessage } = require("../utils/responses/success");
const { validateDiscountById } = require("./HelperController");

const Op = Sequelize.Op;

exports.createCustomer = (req, res) => {
    const { name, account_type, discount } = req.body;
    if (discount) {
        validateDiscountById(discount)
            .then(validDiscount => {
                Customer.create({
                    name: name.toLowerCase(),
                    account_type,
                    discount_id: validDiscount.id
                })
                    .then(createdCustomer => successMessage(res, "Customer created Successfully!", createdCustomer))
                    .catch(error => errorMessage(res, `${error}`));
            })
            .catch(error => errorMessage(res, `${error.message}`));
    } else {
        Customer.create({
            name: name.toLowerCase(),
            account_type
        })
            .then(createdCustomer => successMessage(res, "Customer created Successfully!", createdCustomer))
            .catch(error => errorMessage(res, `${error}`));
    }
}

exports.getAllCustomers = (req, res) => {
    Customer.findAll({ rew: false })
        .then(customers => successMessage(res, "Customers fetched Successfully!", customers))
        .catch(error => errorMessage(res, `${error.message}`));
}

exports.getCustomerById = (req, res) => {
    const { id } = req.params;
    Customer.findOne({
        where: {
            id: id
        }
    })
        .then(customer => {
            if (customer) successMessage(res, "Customer fetched Successfully!", customer);
            else errorMessage(res, "Invalid User");
        })
        .catch(error => errorMessage(res, `${error.message}`));
}

exports.getCustomerByName = (req, res) => {
    const { name } = req.params;
    Customer.findOne({
        where: {
            name: {
                [Op.like]: `%${name.toLowerCase()}%`
            }
        }
    })
        .then(customer => {
            if (customer) successMessage(res, "Customer fetched Successfully!", customer);
            else errorMessage(res, "User not found");
        })
        .catch(error => errorMessage(res, `${error.message}`));
}
