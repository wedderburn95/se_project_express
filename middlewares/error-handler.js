const { statusCodes } = require("../utils/config");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || statusCodes.INTERNAL_SERVER_ERROR).send({
    message: err.statusCode ? err.message : "An internal error occured",
  });
};

module.exports = errorHandler;
