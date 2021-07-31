const router = require("express").Router();

const usersRoutes = (db) => {
  // -------------get users
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
        res.json(error.message);
      });
  });

  // -------------get user by id
  router.get("/:id", (req, res) => {
    const reqParams = req.params.id;
    db.query(
      `
      SELECT * from users where users.id = $1;
      `
    ,[reqParams])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
   // -------------add new user
  router.post("/", (req, res) => {
    const fistName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const profileImageUrl = req.body.profile_image_url;
    const password = req.body.password;
    const individualIncome = req.body.individual_income;
 
    db.query(
      `
      INSERT INTO users(first_name, last_name, email, profile_image_url, password, individual_income)
      VALUES($1, $2, $3, $4, $5, $6) 
      RETURNING *;
      `
    ,[fistName, lastName, email, profileImageUrl, password, individualIncome])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  
  //-------------update users
  router.put("/:id", (req, res) => {
    const userId = req.params.id;
    const fistName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const profileImageUrl = req.body.profile_image_url;
    const password = req.body.password;
    const individualIncome = req.body.individual_income;
 
    db.query(
      `
      UPDATE users SET first_name = $1, last_name = $2, email = $3, profile_image_url = $4, password = $5, individual_income = $6 WHERE id = $7 RETURNING *;
      `
    ,[fistName, lastName, email, profileImageUrl, password, individualIncome, userId])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  //-------------delete users
  router.delete("/:id", (req, res) => {
    const userID = req.params.id;
    
    db.query(
      `
      DELETE FROM users WHERE users.id = $1
      RETURNING *;
      `
    ,[userID])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  return router;
};

module.exports = usersRoutes;