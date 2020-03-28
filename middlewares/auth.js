const { verifyToken } = require("../middlewares/token");

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }
  let payload;
  try {
    payload = verifyToken(token);
  } catch (error) {
    return res.status(401).send({ message: "С токеном что-то не так" });
  }
  req.user = payload;
  return next();
};

module.exports = auth;
