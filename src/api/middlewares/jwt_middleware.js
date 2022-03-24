const JWT = require("jsonwebtoken");
const jwt_config = require("../config/jwt_config");
const { errorMessage } = require("../utils/responses/error");

let validateToken = (req, res, next) => {
    let tokenValue = req.headers["authorization"];
    if (tokenValue) {
        JWT.verify(tokenValue, jwt_config.secret, (error, data) => {
            if (error) errorMessage(res, "Invalid token found");
            else {
                req.data = data;
                next();
            }
        });
    } else return errorMessage(res, "Token is required");
}

module.exports = {
    checkToken: validateToken
}