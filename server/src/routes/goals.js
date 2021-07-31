const router = require("express").Router();

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
        console.log(error.message);
      });
  });

  router.get("/:id", (req, res) => {
    const reqParams = req.params.id;
    db.query(
      `
      SELECT * from goals where goals.id = $1;
      `
    ,[reqParams])
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  
  //-------------update goals
  //-------------delete goals
  router.delete("/:id", (req, res) => {
    const goalId = req.params.id;
    
    db.query(
      `
      DELETE FROM goals WHERE goals.id = $1;
      `
    ,[goalId])
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  return router;
};

module.exports = goalsRoutes;