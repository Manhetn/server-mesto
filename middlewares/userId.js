const userId = (req, res, next) => {
  req.user = {
    _id: "5e678114957e0d145b78d255"
  };

  next();
};

module.exports = userId;
