const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

const BadRequestError = require("../errors/badRequestError"); // 400

const idVerification = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    next(new BadRequestError("Невалидный id"));
  } else {
    next();
  }
};

module.exports = {
  idVerification
};
