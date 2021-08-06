const router = require("express").Router();

// -------------get budgets
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
        res.json(error.message);
      });
  });

  // -------------get budget by id
  router.get("/:id", (req, res) => {
    const budgetId = req.params.id;

    db.query(
      `
      SELECT * from budgets where budgets.id = $1;
      `,
      [budgetId]
    )
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  // ------------get budget with categories and expenses EVIL DATASTRUCTURE USE WITH EXTREME
  router.get("/all/:id", (req, res) => {
    const ownerId = req.params.id;
    
    db.query(`
    SELECT categories.name as category_name, budgets.name as budget_name, expenses.name as expense_name, categories.id as category_id, 
    budgets.id as budget_id, categories.spending_limit, expenses.cost, expenses.payee, expenses.amount_paid, expenses.category_id as expense_cat_id
    FROM budgets 
    JOIN categories ON categories.budget_id = budgets.id 
    JOIN expenses ON expenses.category_id = categories.id 
    WHERE budgets.active=true AND budgets.user_id = $1
    GROUP BY categories.name, budgets.name, expenses.name, categories.id, budgets.id, expenses.cost, expenses.payee, expenses.amount_paid, expenses.category_id;
    `, [ownerId])
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  // Grab all categories for active budget
  router.get('/all/categories/:id', (req, res) => {
    const ownerId = req.params.id;

    db.query(`
      SELECT categories.name as category_name, 
      categories.id as category_id, 
      categories.spending_limit as spend_limit,
      categories.name as category_name
      FROM categories
      JOIN budgets ON categories.budget_id = budgets.id
      WHERE budgets.active = true AND budgets.user_id = $1
     `, [ownerId])
      .then(response => {
        res.json(response.rows)
      })
      .catch((error) => {
        res.json(error.message)
      });
  });

  // Grab the total of all expenses by category for the active budget
  router.get('/all/totalbycategory/:id', (req, res) => {
    const ownerId = req.params.id;

    db.query(`
    SELECT categories.name, categories.id, SUM(cost), budgets.id as budget_id
    FROM expenses
    JOIN categories ON expenses.category_id = categories.id
    JOIN budgets ON categories.budget_id = budgets.id
    WHERE budgets.active = true AND budgets.user_id = $1
    GROUP BY categories.id, budgets.id;
     `, [ownerId])
      .then(response => {
        res.json(response.rows)
      })
      .catch((error) => {
        res.json(error.message)
      });
  });

  // Grab all expenses for the current budget
  router.get('/all/expenses/:id', (req, res) => {
    const ownerId = req.params.id;

    db.query(`
    SELECT expenses.name as expense_name,
    expenses.category_id as category_id,
    expenses.cost  as cost,
    expenses.amount_paid as amount_paid,
    expenses.payee as payee
    FROM expenses
    JOIN categories ON categories.id = expenses.category_id
    JOIN budgets ON budgets.id = categories.budget_id
    WHERE budgets.active = true AND budgets.user_id = 1;
    `)
      .then(respones => {
        res.json(respones.rows)
      })
      .catch(error => {
        res.json(error.message)
      })
  })

  //-------------add new budget
  router.post("/", (req, res) => {
    const userId = req.body.user_id;
    const budegtName = req.body.name;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;

    db.query(
      `
      INSERT INTO budgets(user_id, name, start_date, end_date)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `
    ,[userId, budegtName, startDate, endDate])
      .then((response) => {
      res.json(response.rows[0]);
    })
    .catch((error) => {
      res.json(error.message);
    });
  });

  //-------------update budget by id
  router.put("/:id", (req, res) => {
    const budgetId = req.params.id;
    const budegtName = req.body.name;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;

    db.query(
      `
      UPDATE budgets SET name = $2, start_date =$3, end_date=$4 WHERE id = $1 RETURNING *;
      `
    ,[budgetId, budegtName, startDate, endDate])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  //SELECT * FROM budgets JOIN categories ON categories.budget_id = budgets.id JOIN expenses ON expenses.category_id = categories.id; 

  //-------------delete budget by id
  router.delete("/:id", (req, res) => {
    const budgetId = req.params.id;

    db.query(
      `
      DELETE FROM budgets WHERE budgets.id = $1
      RETURNING *;
      `,
      [budgetId]
    )
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  return router;
};

module.exports = budgetsRoutes;
