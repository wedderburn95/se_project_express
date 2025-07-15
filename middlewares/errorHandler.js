const { statusCodes } = require("../utils/config");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || statusCodes.InternalServerError).send({
    message: err.statusCode ? err.message : "An internal error occured",
  });
};

module.exports = errorHandler;
