const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");

const users = require("./routes/users");
const cards = require("./routes/cards");
const invalidPathError = require("./routes/invalidPathError");
const errorHandler = require("./middlewares/errorHandler");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());

app.use(users);
app.use(cards);

app.use(errors());
app.use(errorHandler);
app.use(invalidPathError);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
