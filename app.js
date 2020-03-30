const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const users = require("./routes/users");
const cards = require("./routes/cards");
const errors = require("./routes/errors");
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
app.use(errorHandler);

app.use(errors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
