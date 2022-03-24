const joi = require("joi");
const { errorMessage } = require("../responses/error");

exports.createDiscountMiddleware = async (req, res, next) => {

    const createDiscountSchema = joi.object({
        desc : joi.string().required(),
        type: joi.string().required(),
        apply_method: joi.string().valid('PERC', 'VALUE').required(),
        value: joi.required()
    });

    const payload = {
        desc: req.body.desc,
        type: req.body.type,
        apply_method: req.body.apply_method,
        value: req.body.value
    };

    const { error } = createDiscountSchema.validate(payload);
    if (error) return errorMessage(res, `${error.message}`);
    else next();
};

exports.getDsicountByTypeMiddleware = async (req, res, next) => {

    const getDsicountByTypeSchema = joi.object({
        type : joi.string().required()
    });

    const payload = {
        type: req.params.type
    };

    const { error } = getDsicountByTypeSchema.validate(payload);
    if (error) return errorMessage(res, `${error.message}`);
    else next();
};
