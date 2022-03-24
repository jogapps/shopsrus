const Sequelize = require("sequelize");
const moment = require("moment");

const { Invoice } = require("../models");
const { errorMessage } = require("../utils/responses/error");
const { successMessage } = require("../utils/responses/success");
const { validateCustomerByID, validateDiscountById } = require("./HelperController");

const Op = Sequelize.Op;

exports.addInvoice = async (req, res) => {
    const { customer, discount, product_name, groceries, amount } = req.body;
    try {
        let processedDiscount;
        
        let validCustomer = await validateCustomerByID(customer);
        let appliedDiscount;
        let invoiceDiscount = discount ? await validateDiscountById(discount) : "";
        let customerDiscount;
        if(validCustomer.discount_id) {
            customerDiscount = await validateDiscountById(validCustomer.discount_id);
        }

        // getting applied discount from either customer // inputed discount
        if(discount && validCustomer.discount_id) appliedDiscount = invoiceDiscount;
        else if(!discount && validCustomer.discount_id) appliedDiscount = customerDiscount;
        else if(discount && !validCustomer.discount_id) appliedDiscount = invoiceDiscount;
        else appliedDiscount = null;

        if(appliedDiscount != null) {
            let applyType = appliedDiscount.application;
            let value = appliedDiscount.value;
            if(applyType === "PERC" && !groceries) processedDiscount = (value * amount / 100);
            else if(applyType === "VALUE") {
                let discountArray = value.split(":");
                let discountQty = Number(discountArray[0]);
                let discountMultiplier = Number(discountArray[1]);
                processedDiscount = (Math.floor(amount / discountQty) * discountMultiplier);
            }
        } else {
            // apply just the 2 years option if applicable to createdAt of the user
            years = moment().diff(`${validCustomer.createdAt}`, 'years');
            if(years >= 2) processedDiscount = (5 * amount / 100);
            else processedDiscount = 0;
        }



        Invoice.create({
            customer_id: validCustomer.id,
            discount_id: discount,
            product_name,
            is_groceries: groceries,
            amount,
            payable_amount: amount - processedDiscount
        })
            .then(createdInvoice => successMessage(res, "Invoice processed and created successfully!", createdInvoice))
            .catch(error => errorMessage(res, `${error.message}`));
    } catch (error) {
        errorMessage(res, `${error.message}`);
    }
}