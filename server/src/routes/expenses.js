const router = require("express").Router();

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
        console.log(error.message);
      });
  });

  router.get("/:id", (req, res) => {
    const reqParams = req.params.id;
    db.query(
      `
      SELECT * from expenses where expenses.id = $1;
      `
    ,[reqParams])
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  // -------------add expenses --not working properyly
  //-------------update expenses --not working properyly
  //-------------delete expenses
  router.delete("/:id", (req, res) => {
    const reqParams = req.params.id;

    db.query(
      `
      DELETE FROM expenses WHERE expenses.id = $1;
      `
    ,[reqParams])
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  return router;
};

module.exports = expensesRoutes;