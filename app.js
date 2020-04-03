require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");

const users = require("./routes/users");
const cards = require("./routes/cards");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const invalidPathError = require("./routes/invalidPathError");
const errorHandler = require("./middlewares/errorHandler");

const {
  PORT = 3000,
  DATABASE_URL = "mongodb://localhost:27017/mestodb"
} = process.env;
const app = express();

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());

app.use(requestLogger);
app.use(users);
app.use(cards);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.use(invalidPathError);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
