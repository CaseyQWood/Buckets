const router = require("express").Router();

const usersRoutes = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `
      SELECT * from users;
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
      SELECT * from users where users.id = $1;
      `
    ,[reqParams])
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  
  //-------------update users
  //-------------delete users
  router.delete("/:id", (req, res) => {
    const userID = req.params.id;
    
    db.query(
      `
      DELETE FROM users WHERE users.id = $1;
      `
    ,[userID])
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  return router;
};

module.exports = usersRoutes;