require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan')

const app = express();
const port = process.env.PGPORT || 3001;


const cookieSession = require("cookie-session");
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(express.json());

const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);

db.connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const categoriesRoutes = require("./routes/categories");
const usersRoutes = require("./routes/users");
const expensesRoutes = require("./routes/expenses");
const goalsRoutes = require("./routes/goals");
const budgetsRoutes = require("./routes/budgets");

app.use("/api/categories", categoriesRoutes(db));
app.use("/api/users", usersRoutes(db));
app.use("/api/expenses", expensesRoutes(db));
app.use("/api/goals", goalsRoutes(db));
app.use("/api/budgets", budgetsRoutes(db));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
