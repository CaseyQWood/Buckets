DROP TABLE IF EXISTS expenses CASCADE;

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  cost MONEY NOT NULL,
  frequency VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  payee VARCHAR(255) NOT NULL,
  amount_paid MONEY NOT NULL,
  priority INTEGER
);