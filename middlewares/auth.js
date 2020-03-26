const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }
  let payload;
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "secret-key"
    );
  } catch (error) {
    return res.status(401).send({ message: "С токеном что-то не так" });
  }
  req.user = payload;
  return next();
};

module.exports = auth;
