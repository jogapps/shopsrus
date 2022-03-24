const joi = require("joi");
const { errorMessage } = require("../responses/error");

exports.createCustomerMiddleware = async (req, res, next) => {

    const createCustomerSchema = joi.object({
        name : joi.string().required(),
        account_type: joi.string().required(),
        discount: joi.string().uuid()
    });

    const payload = {
        name: req.body.name,
        account_type: req.body.account_type,
        discount: req.body.discount
    };

    const { error } = createCustomerSchema.validate(payload);
    if (error) return errorMessage(res, `${error.message}`);
    else next();
};

exports.getCustomerbyIDMiddleware = async (req, res, next) => {

    const getCustomerbyIDSchema = joi.object({
        id : joi.string().uuid().required()
    });

    const payload = {
        id: req.params.id
    };

    const { error } = getCustomerbyIDSchema.validate(payload);
    if (error) return errorMessage(res, `${error.message}`);
    else next();
};

exports.getCustomerbyNameMiddleware = async (req, res, next) => {

    const getCustomerbyNameSchema = joi.object({
        name : joi.string().required()
    });

    const payload = {
        name: req.params.name
    };

    const { error } = getCustomerbyNameSchema.validate(payload);
    if (error) return errorMessage(res, `${error.message}`);
    else next();
};