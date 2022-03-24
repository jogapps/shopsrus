const { Admin, Discount, Customer } = require("../models");

exports.validateAdminByEmail = (email) => {
    return new Promise((resolve, reject) => {
        if (!email) reject(new Error("Enter required fields!"));
        Admin.findOne({
            where: {
                email: email
            }
        })
            .then(admin => {
                if (admin) resolve(admin);
                else reject(new Error("Invalid Admin!"));
            })
            .catch(error => reject(new Error("Server Error!")))
    });
}

exports.validateCustomerByID = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) reject(new Error("Enter required fields!"));
        Customer.findOne({
            where: {
                id: id
            }
        })
            .then(customer => {
                if (customer) resolve(customer);
                else reject(new Error("Invalid Customer!"));
            })
            .catch(error => reject(new Error("Server Error!")))
    });
}

exports.validateDiscountById = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) reject(new Error("Enter required fields!"));
        Discount.findOne({
            where: {
                id: id
            }
        })
            .then(discount => {
                if (discount) resolve(discount);
                else reject(new Error("Invalid Discount!"));
            })
            .catch(error => reject(new Error("Server Error!")))
    });
}
