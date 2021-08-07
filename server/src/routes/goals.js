const router = require("express").Router();

//-------------get goals
const goalsRoutes = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `
      SELECT * from goals;
      `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  //-------------get goal by id
  router.get("/:id", (req, res) => {
    const reqParams = req.params.id;
    db.query(
      `
      SELECT * from goals where goals.user_id = $1;
      `
    ,[reqParams])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  //-------------get all goals
  router.get("/all/:id", (req, res) => {
    const ownerId = req.params.id;
    db.query(
      `
      SELECT * from goals where goals.user_id = $1;
      `
    ,[ownerId])
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  //-------------add goal
  router.post("/", (req, res) => {
    const goalsName = req.body.name;
    const userId = req.body.user_id;
    const budgetId = req.body.budget_id;
    const amountToGoal = req.body.amount_to_goal;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;
 
    db.query(
      `
      INSERT INTO goals(name, user_id, budget_id, amount_to_goal, start_date, end_date)
      VALUES($1, $2, $3, $4, $5, $6) 
      RETURNING *;
      `
    ,[goalsName, userId, budgetId, amountToGoal, startDate, endDate])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  
  //-------------update goals
  router.put("/:id", (req, res) => {
    const goalId = req.params.id;
    const goalsName = req.body.name;
    const userId = req.body.user_id;
    const budgetId = req.body.budget_id;
    const amountToGoal = req.body.amount_to_goal;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;

    db.query(
      `
      UPDATE goals SET name = $1, user_id = $2, budget_id = $3, amount_to_goal = $4, start_date = $5, end_date =$6 WHERE id = $7 RETURNING *;
      `
    ,[goalsName, userId, budgetId, amountToGoal, startDate, endDate, goalId])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  //-------------delete goals
  router.delete("/:id", (req, res) => {
    const goalId = req.params.id;
    
    db.query(
      `
      DELETE FROM goals WHERE goals.id = $1
      RETURNING *;
      `
    ,[goalId])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  return router;
};

module.exports = goalsRoutes;