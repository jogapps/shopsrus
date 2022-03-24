const bcrypt = require("bcrypt");
const { errorMessage } = require("../utils/responses/error");
const { successMessage } = require("../utils/responses/success");
const { generateToken } = require("../utils/token/token");
const { validateAdminByEmail } = require("./HelperController");


exports.login = (req, res) => {
    const { email, password } = req.body;
    validateAdminByEmail(email)
    .then(admin => {
        if (bcrypt.compareSync(password, admin.password)) {
            successMessage(res, "Admin logged in successfully!",
                {
                    ...{ token: generateToken(admin.id) },
                    ...admin.dataValues,
                });
        } else errorMessage(res, "Wrong credentials");
    })
    .catch(error => errorMessage(res, `${error.message}`));
}