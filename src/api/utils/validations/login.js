const joi = require("joi");
const { errorMessage } = require("../responses/error");

exports.loginMiddleware = async (req, res, next) => {

    const loginSchema = joi.object({
        email : joi.string().required(),
        password: joi.string().required()
    });

    const payload = {
        email: req.body.email,
        password: req.body.password
    };

    const { error } = loginSchema.validate(payload);
    if (error) return errorMessage(res, `${error.message}`);
    else next();
};