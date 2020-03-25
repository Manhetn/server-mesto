const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send({ massage: "Необходима авторизация" });
  }
  let payload;
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    // попытаемся верифицировать токен
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "key-secret"
    );
  } catch (error) {
    return res.status(401).send({ massage: "С токеном что-то не так" });
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  // return next();
  return res.status(401).send({ massage: "С токеном все так" });
};

module.exports = auth;
