-- BANK DATABASE MANAGEMENT SYSTEM (MySQL)

CREATE DATABASE Bank_Management;
USE Bank_Management;



DROP TABLE IF EXISTS BankTransactions;
DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Branches;

-- Customers table
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(10),
    address VARCHAR(255)
);


-- Branches table
CREATE TABLE Branches (
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL
);

-- Accounts table
CREATE TABLE Accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    branch_id INT NOT NULL,
    account_type ENUM('savings', 'current') NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0 CHECK (balance >= 0),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (branch_id) REFERENCES Branches(branch_id)
);


-- BankTransactions table
CREATE TABLE BankTransactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_type ENUM('deposit', 'withdrawal') NOT NULL,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);


-- Employees table
CREATE TABLE Employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(100),
    branch_id INT,
    FOREIGN KEY (branch_id) REFERENCES Branches(branch_id)
);

-- Sample Data
INSERT INTO Customers (name, email, phone, address) VALUES
('Aevoae Teodora Denisa', 'aevoae.teo_deny@gmail.com', '0712345678', '97 Tecuci, Galati'),
('Danu Andrei Gabriel', 'danu.banu@gmail.com', '0723456789', '129 Tecuci, Galati');

INSERT INTO Branches (branch_name, city) VALUES
('Victoria Agency', 'Bucharest'),
('BRD Tower', 'Bucharest');

INSERT INTO Accounts (customer_id, branch_id, account_type, balance) VALUES
(1, 1, 'savings', 2500.00),
(1, 1, 'current', 1000.00),
(2, 2, 'savings', 3000.00);


INSERT INTO BankTransactions (account_id, amount, transaction_type) VALUES
(1, 500.00, 'deposit'),
(2, 200.00, 'withdrawal'),
(3, 1500.00, 'deposit');

INSERT INTO BankTransactions (account_id, amount, transaction_type) VALUES
(1, 5001.00, 'deposit'),
(2, 2010.00, 'deposit'),
(3, 1700.00, 'deposit');


INSERT INTO Employees (name, position, branch_id) VALUES
('Ambrozia Ioana Roberta', 'Manager', 1),
('Androne Cătălin', 'Teller', 2),
('Badea Darius', 'Customer Service Representative', 1),
('Ambrozie Ioan', 'Relationship Manager', 2),
('Tănase Marius' , 'Loan Officer', 2),
('Cristea Ionel', 'Branch Manager', 2);


-- Vizualizare clienți
SELECT * FROM Customers;

-- Vizualizare conturi
SELECT * FROM Accounts;

-- Vizualizare angajați
SELECT * FROM Employees;

-- Vizualizare tranzactii
SELECT * FROM BankTransactions;


-- Inserare
INSERT INTO Customers (name, email, phone, address)
VALUES ('Gorîn Tudor', 'tudorgorin@gmail.com', '0721305919', '789 Bucuresti');


-- Actualizare
UPDATE Accounts
SET balance = balance + 500
WHERE account_id = 1;


-- Stergere
DELETE FROM BankTransactions
WHERE transaction_id = 3;

-- 5 interogări intra-tabel 

-- Toți clienții
SELECT name FROM Customers;

-- Conturile cu sold peste 1000
SELECT account_id, balance FROM Accounts WHERE balance > 1000;


-- Clienți ordonați alfabetic
SELECT * FROM Customers ORDER BY name ASC;

-- Conturi între anumite sume
SELECT * FROM Accounts WHERE balance BETWEEN 1000 AND 3000;

-- Număr de angajați per poziție
SELECT position, COUNT(*) AS total FROM Employees GROUP BY position;


-- 2 interogări inter-tabele
SELECT c.name, a.account_type, a.balance
FROM Customers c
JOIN Accounts a ON c.customer_id = a.customer_id;

SELECT e.name AS employee_name, b.branch_name, b.city
FROM Employees e
JOIN Branches b ON e.branch_id = b.branch_id;

-- 1 sub-interogare	
SELECT * FROM Customers
WHERE customer_id IN (
    SELECT customer_id FROM Accounts WHERE balance > 2000
);


-- 1 funcție scalară și 1 funcție agregat
SELECT UPPER(name) AS uppercase_name FROM Customers;
SELECT SUM(balance) AS total_balance FROM Accounts;

-- Off
DROP DATABASE IF EXISTS Bank_Management;
