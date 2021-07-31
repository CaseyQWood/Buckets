const router = require("express").Router();

//-------------get expenses
const expensesRoutes = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `
      SELECT * from expenses;
      `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  //-------------get expense by id
  router.get("/:id", (req, res) => {
    const expenseID = req.params.id;
    db.query(
      `
      SELECT * from expenses where expenses.id = $1;
      `
    ,[expenseID])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  // -------------add expense 
  router.post("/", (req, res) => {
    const expenseName = req.body.name;
    const cost = req.body.cost;
    const frequency = req.body.frequency;
    const categoryId = req.body.category_id;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;
    const payee = req.body.payee;
    const amountPaid = req.body.amount_paid;
 
    db.query(
      `
      INSERT INTO expenses(name, cost, frequency, category_id, start_date, end_date, payee, amount_paid)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *;
      `
    ,[expenseName, cost, frequency, categoryId, startDate, endDate, payee, amountPaid])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  //-------------update expenses --not working properyly
  router.put("/:id", (req, res) => {
    const expenseID = req.params.id;
    const expenseName = req.body.name;
    const cost = req.body.cost;
    const frequency = req.body.frequency;
    const categoryId = req.body.category_id;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;
    const payee = req.body.payee;
    const amountPaid = req.body.amount_paid;
 
    db.query(
      `
      UPDATE expenses SET name = $1, cost = $2, frequency = $3, category_id = $4, start_date = $5, end_date = $6, payee = $7, amount_paid = $8 WHERE id = $9
      RETURNING *;
      `
    ,[expenseName, cost, frequency, categoryId, startDate, endDate, payee, amountPaid, expenseID])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  
  //-------------delete expenses
  router.delete("/:id", (req, res) => {
    const reqParams = req.params.id;

    db.query(
      `
      DELETE FROM expenses WHERE expenses.id = $1
      RETURNING *;
      `
    ,[reqParams])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  return router;
};

module.exports = expensesRoutes;