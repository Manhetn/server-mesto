const { verifyToken } = require("../middlewares/token");
const UnauthorizedError = require("../errors/unauthorizedError"); // 401

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new UnauthorizedError("Необходима авторизация"));
  }
  let payload;
  try {
    payload = verifyToken(token);
  } catch (error) {
    next(new UnauthorizedError("С токеном что-то не так"));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
