const router = require("express").Router();

// -------------get categories
const categoriesRoutes = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `
      SELECT * from categories;
      `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  // -------------get category by id
  router.get("/:id", (req, res) => {
    const reqParams = req.params.id;
    db.query(
      `
      SELECT * from categories where categories.id = $1;
      `
    ,[reqParams])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  // -------------add new category
  router.post("/", (req, res) => {
    const categoriesName = req.body.name;
    const budgetId = req.body.budget_id;
    const spendingLimit = req.body.spending_limit;
 
    db.query(
      `
      INSERT INTO categories(name, budget_id, spending_limit)
      VALUES($1, $2, $3) 
      RETURNING *;
      `
    ,[categoriesName, budgetId, spendingLimit])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  //-------------update category by id
  router.put("/:id", (req, res) => {
    const reqParams = req.params.id;
    const updatedName = req.body.updatedName;
    const updatedLimit = req.body.updatedLimit;
    db.query(
      `
      UPDATE categories SET name = $2, spending_limit = $3 WHERE id = $1 RETURNING *;
      `
    ,[reqParams, updatedName, updatedLimit])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  //-------------delete category by id
  router.delete("/:id", (req, res) => {
    const reqParams = req.params.id;

    db.query(
      `
      DELETE FROM categories WHERE categories.id = $1 
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

module.exports = categoriesRoutes;