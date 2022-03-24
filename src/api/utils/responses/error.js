exports.errorMessage = (res, message) => {
    res.status(500).json({
        status: false,
        message: message ? message.replaceAll("Sequelize", "") : null,
    });
}