CREATE TABLE IF NOT EXISTS `customers` (
  id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  birthdate DATE NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS currencies (
  currency_id INT PRIMARY KEY AUTO_INCREMENT,
  currency_code VARCHAR(3),
  currency_name VARCHAR(255),
  currency_symbol VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS transactions (
  transaction_id INT PRIMARY KEY AUTO_INCREMENT,
  date DATE,
  city VARCHAR(255),
  address VARCHAR(255),
  from_currency_id INT,
  to_currency_id INT,
  amount DECIMAL(10, 2),
  status VARCHAR(255),
  from_user_id INT,
  to_user_id INT,
  FOREIGN KEY (from_currency_id) REFERENCES currencies(currency_id),
  FOREIGN KEY (to_currency_id) REFERENCES currencies(currency_id),
  FOREIGN KEY (from_user_id) REFERENCES customers(id),
  FOREIGN KEY (to_user_id) REFERENCES customers(id)
);

