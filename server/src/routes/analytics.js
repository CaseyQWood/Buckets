const router = require("express").Router();


const analyticsRoutes = (db) => {

  // -------------get budget for analytics
  router.post("/budget/:id", (req, res) => {
    const userId = req.params.id;
    const from = req.body.from;
    const to = req.body.to;

    db.query(
      `SELECT users.first_name as first_name, users.last_name as last_name, categories.name, categories.id, SUM(cost) as total_expense, budgets.start_date as start_date, budgets.end_date as end_date, categories.spending_limit as spending_limit
      FROM expenses
      JOIN categories ON expenses.category_id = categories.id
      JOIN budgets ON categories.budget_id = budgets.id
      JOIN users ON users.id = user_id
      WHERE expenses.start_date >= $2 AND expenses.end_date <= $3 AND users.id = $1
      GROUP BY categories.id, budgets.id, users.id;
       `, [userId, from, to]
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  //-------------get goals for analytics
  router.post("/goals/:id", (req, res) => {
    const userId = req.params.id;
    const from = req.body.from;
    const to = req.body.to;

    db.query(
      `SELECT goals.name, goals.amount_to_goal, goals.amount_added, goals.start_date, goals.end_date from goals WHERE goals.start_date >= $2 and goals.end_date <= $3 AND goals.user_id = $1;;
       `, [userId, from, to]
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  return router;
};

module.exports = analyticsRoutes;
