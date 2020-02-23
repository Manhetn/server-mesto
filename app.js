const express = require("express");
const path = require("path");

const users = require("./routes/users.js");
const cards = require("./routes/cards.js");
const errors = require("./routes/errors.js");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/users", users);
app.use("/cards", cards);
app.use(errors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
