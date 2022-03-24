const joi = require("joi");
const { errorMessage } = require("../responses/error");

exports.createInvoiceMiddleware = async (req, res, next) => {

    const createInvoiceSchema = joi.object({
        customer : joi.string().uuid().required(),
        discount: joi.string().uuid(),
        product_name: joi.string().required(),
        groceries: joi.boolean().required(),
        amount: joi.number().required()
    });

    const payload = {
        customer: req.body.customer,
        discount: req.body.discount,
        product_name: req.body.product_name,
        groceries: req.body.groceries,
        amount: req.body.amount
    };

    const { error } = createInvoiceSchema.validate(payload);
    if (error) return errorMessage(res, `${error.message}`);
    else next();
};