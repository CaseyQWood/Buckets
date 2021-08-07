const router = require("express").Router();


const analyticsRoutes = (db) => {

  // -------------get budget by user_id
  router.post("/budget/:id", (req, res) => {
    const userId = req.params.id;
    const from = req.body.from;
    const to = req.body.to;
    
    console.log("from----budget backend", from);
    console.log("to----budget backend", to);

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

  // 
  router.post("/goals/:id", (req, res) => {
    const userId = req.params.id;
    const from = req.body.from;
    const to = req.body.to;
    
    console.log("from----goal backend", from);
    console.log("to----goal backend", to);

    db.query(
      `SELECT goals.name, goals.amount_to_goal, goals.start_date, goals.end_date from goals WHERE goals.start_date >= $2 AND goals.end_date <= $3 AND goals.user_id = $1;
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

        // analytics budeget limit and total_expense

        // SELECT users.first_name as first_name, users.last_name as last_name, categories.name, categories.id, SUM(cost) as total_expense, budgets.start_date as start_date, budgets.end_date as end_date, categories.spending_limit as spending_limit
        // FROM expenses
        // JOIN categories ON expenses.category_id = categories.id
        // JOIN budgets ON categories.budget_id = budgets.id
        // JOIN users ON users.id = user_id
        // WHERE expenses.start_date >= '2021-01-01' AND expenses.end_date <= '2021-08-30'AND users.id =1
        // GROUP BY categories.id, budgets.id, users.id;

        // analytics goal 
        // SELECT goals.name, goals.amount_to_goal, goals.start_date, goals.end_date from goals WHERE goals.start_date >= '2021-01-01' AND goals.end_date <= '2021-08-30'AND goals.user_id =1;


module.exports = analyticsRoutes;
