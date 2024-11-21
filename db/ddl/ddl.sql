CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) DEFAULT '',
  password VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255) DEFAULT '',
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  banner_name VARCHAR(255) NOT NULL,
  banner_image VARCHAR(255) DEFAULT '',
  description TEXT DEFAULT '',
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_code VARCHAR(50) NOT NULL UNIQUE,
  service_name VARCHAR(255) NOT NULL,
  service_icon VARCHAR(255) DEFAULT '',
  service_tariff INT NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number VARCHAR(50) NOT NULL UNIQUE,
  transaction_type VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  total_amount INT NOT NULL,
  user_email VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_balance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  balance INT DEFAULT 0,
  user_email VARCHAR(255) UNIQUE REFERENCES users(email) ON DELETE CASCADE,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);