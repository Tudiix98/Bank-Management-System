const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./backend_db');

app.use(cors());
app.use(express.json());

// Vizualizare date (Customers, Accounts, Employees)
app.get('/customers', (_, res) => {
  db.query('SELECT * FROM Customers', (err, result) => res.json(err || result));
});

app.get('/accounts', (_, res) => {
  db.query('SELECT * FROM Accounts', (err, result) => res.json(err || result));
});

app.get('/employees', (_, res) => {
  db.query('SELECT * FROM Employees', (err, result) => res.json(err || result));
});

// Inserare client nou
app.post('/customers', (req, res) => {
  const { name, email, phone, address } = req.body;
  db.query('INSERT INTO Customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
    [name, email, phone, address], (err, result) => res.json(err || result));
});

// Actualizare sold
app.put('/accounts/:id', (req, res) => {
  const { balance } = req.body;
  db.query('UPDATE Accounts SET balance = ? WHERE account_id = ?',
    [balance, req.params.id], (err, result) => res.json(err || result));
});

// Ștergere tranzacție
app.delete('/transactions/:id', (req, res) => {
  db.query('DELETE FROM BankTransactions WHERE transaction_id = ?',
    [req.params.id], (err, result) => res.json(err || result));
});

// Interogări extra
app.get('/accounts/over1000', (_, res) => {
  db.query('SELECT account_id, balance FROM Accounts WHERE balance > 1000', (err, result) => res.json(err || result));
});

app.get('/customers/sorted', (_, res) => {
  db.query('SELECT * FROM Customers ORDER BY name ASC', (err, result) => res.json(err || result));
});

app.get('/employees/byPosition', (_, res) => {
  db.query('SELECT position, COUNT(*) AS total FROM Employees GROUP BY position', (err, result) => res.json(err || result));
});

app.get('/accounts/join', (_, res) => {
  db.query(`
    SELECT c.name, a.account_type, a.balance
    FROM Customers c
    JOIN Accounts a ON c.customer_id = a.customer_id
  `, (err, result) => res.json(err || result));
});

app.get('/customers/highBalance', (_, res) => {
  db.query(`
    SELECT * FROM Customers
    WHERE customer_id IN (
      SELECT customer_id FROM Accounts WHERE balance > 2000
    )
  `, (err, result) => res.json(err || result));
});

app.get('/customers/uppercase', (_, res) => {
  db.query('SELECT UPPER(name) AS uppercase_name FROM Customers', (err, result) => res.json(err || result));
});

app.get('/accounts/totalBalance', (_, res) => {
  db.query('SELECT SUM(balance) AS total_balance FROM Accounts', (err, result) => res.json(err || result));
});

// Clienți (doar numele)
app.get('/customers/names', (_, res) => {
  db.query('SELECT name FROM Customers', (err, result) => res.json(err || result));
});

// Conturi între anumite sume
app.get('/accounts/between', (_, res) => {
  db.query('SELECT * FROM Accounts WHERE balance BETWEEN 1000 AND 3000', (err, result) => res.json(err || result));
});

// Join Employees + Branches
app.get('/employees/branchinfo', (_, res) => {
  db.query(`
    SELECT e.name AS employee_name, b.branch_name, b.city
    FROM Employees e
    JOIN Branches b ON e.branch_id = b.branch_id
  `, (err, result) => res.json(err || result));
});


app.listen(3000, () => console.log('Yey serverul a pornit !!!'));
