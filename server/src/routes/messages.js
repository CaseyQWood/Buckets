const router = require("express").Router();

const messagesRoutes = (db) => {
  router.get("/", (req, res) => {
    db.query(`
      SELECT * FROM messages
      WHERE reciever_email = $1`, ['greggy@gmail.com']
    )
    .then((response) => {
      res.json(response.rows)
    })
    .catch((err) => {
      res.json(err)
    })
  });


  router.put('/send', (req, res) => {
    db.query(`
      INSERT INTO messages (sender_id, budget_id,  message, reciever_email) 
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [req.body.userID, req.body.budgetId, req.body.message, req.body.recieverMail]
    )
  })


  router.put('/save', (req, res) => {
    const data = req.body.message
    let newBudgetId
    const convertID = (obj, id) => {
      return obj.budget_id = id
    }

    db.query(`
      SELECT * FROM budgets
      WHERE id = $1
    `, [data.budget_id]
    )
    .then((response) => {

      db.query(`
        INSERT INTO budgets (user_id, name) 
        VALUES ($1, $2) 
        RETURNING *
      `,[req.body.ownerId, response.rows[0].name]

      )
      .then((response) => {
        newBudgetId = response.rows[0].id

        db.query(`
        SELECT * FROM categories
        WHERE budget_id = $1
      `,[req.body.message.budget_id]

      )
      .then((response) => {

        response.rows.forEach((x) => {
          convertID(x, newBudgetId)
        })

        response.rows.forEach((y) => {
          db.query(`
            INSERT INTO categories (name, budget_id, spending_limit)
            VALUES ($1, $2, $3)
            
            `, [y.name, y.budget_id, y.spending_limit]
          )
          .then(() => {
            db.query(`
              DELETE FROM messages
              WHERE id = $1
              `, [req.body.message.id]
            )
          })
        })
      })
      })
    })
  })
  



  return router
};

module.exports = messagesRoutes
