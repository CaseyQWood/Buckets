const router = require("express").Router();

const budgetsRoutes = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `
      SELECT * from budgets;
      `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  router.get("/:id", (req, res) => {
    const budgetId = req.params.id;
    db.query(
      `
      SELECT * from budgets where budgets.id = $1;
      `
    ,[budgetId])
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  
  //-------------update budgets
  //-------------delete budgets
  router.delete("/:id", (req, res) => {
    const budgetId = req.params.id;
    
    db.query(
      `
      DELETE FROM budgets WHERE budgets.id = $1;
      `
    ,[budgetId])
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  return router;
};

module.exports = budgetsRoutes;