-- Avivo Users Database Dump
-- This file can be used to set up the database with schema and sample data
-- Usage: mysql -u root -p < database/dump.sql

-- Create database
CREATE DATABASE IF NOT EXISTS `avivo_users`;
USE `avivo_users`;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  maidenName VARCHAR(100),
  age INT,
  gender ENUM('male', 'female', 'other'),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  username VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  birthDate DATE,
  image VARCHAR(500),
  bloodGroup VARCHAR(10),
  height DECIMAL(5,2),
  weight DECIMAL(5,2),
  eyeColor VARCHAR(50),
  hairColor VARCHAR(50),
  hairType VARCHAR(50),
  domain VARCHAR(255),
  ip VARCHAR(45),
  address_street VARCHAR(255),
  address_city VARCHAR(100),
  address_state VARCHAR(100),
  address_postalCode VARCHAR(20),
  address_coordinates_lat DECIMAL(10, 8),
  address_coordinates_lng DECIMAL(11, 8),
  address_country VARCHAR(100),
  company_name VARCHAR(255),
  company_department VARCHAR(100),
  company_title VARCHAR(255),
  company_address_street VARCHAR(255),
  company_address_city VARCHAR(100),
  company_address_state VARCHAR(100),
  company_address_postalCode VARCHAR(20),
  company_address_coordinates_lat DECIMAL(10, 8),
  company_address_coordinates_lng DECIMAL(11, 8),
  company_address_country VARCHAR(100),
  ein VARCHAR(50),
  ssn VARCHAR(50),
  userAgent VARCHAR(500),
  role VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_company_name (company_name),
  INDEX idx_role (role),
  INDEX idx_country (address_country)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO users (
  firstName, lastName, maidenName, age, gender, email, phone, username, password,
  birthDate, image, bloodGroup, height, weight, eyeColor, hairColor, hairType,
  domain, ip, address_street, address_city, address_state, address_postalCode,
  address_coordinates_lat, address_coordinates_lng, address_country,
  company_name, company_department, company_title,
  company_address_street, company_address_city, company_address_state,
  company_address_postalCode, company_address_coordinates_lat,
  company_address_coordinates_lng, company_address_country,
  ein, ssn, userAgent, role
) VALUES
('Terry', 'Medhurst', 'Smitham', 50, 'male', 'atuny0@sohu.com', '+63 791 675 8914', 'atuny0', '9uQFF1Lh',
 '2000-12-25', 'https://robohash.org/Terry.png?set=set4', 'A-', 189, 75.4, 'Green', 'Black', 'Strands',
 'slashdot.org', '117.29.86.254', '1745 T Street Southeast', 'Washington', 'DC', '20020',
 38.867033, -76.979235, 'United States',
 'Blanda-O\'Keefe', 'Marketing', 'Help Desk Operator',
 '629 Debbie Drive', 'Nashville', 'TN', '37076',
 36.208114, -86.58621199999999, 'United States',
 '20-9487066', '661-64-2976', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Admin'),

('Sheldon', 'Quigley', 'Cole', 28, 'male', 'hbingley1@plala.or.jp', '+7 813 117 7139', 'hbingley1', 'CQutx25i8r',
 '2003-08-02', 'https://robohash.org/Sheldon.png?set=set4', 'O+', 187, 74, 'Brown', 'Blond', 'Curly',
 '51.la', '253.240.20.181', '6007 Applegate Lane', 'Louisville', 'KY', '40219',
 38.1343013, -85.6498512, 'United States',
 'Aufderhar-Cronin', 'Services', 'Senior Cost Accountant',
 '2017 American Street', 'Crestview', 'FL', '32536',
 30.451467, -86.570954, 'United States',
 '52-4031962', '324-54-1423', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'User'),

('Terrill', 'Hills', 'Hoeger', 38, 'male', 'rshawe2@51.la', '+63 739 292 7942', 'rshawe2', 'OWsTbMUgFc',
 '1992-12-30', 'https://robohash.org/Terrill.png?set=set4', 'A-', 200, 105.3, 'Gray', 'Blond', 'Very curly',
 'earthlink.net', '205.226.171.21', '560 Penstock Drive', 'Grass Valley', 'CA', '95945',
 39.213076, -121.077583, 'United States',
 'Lindgren LLC', 'Marketing', 'Mechanical Systems Engineer',
 '89901 Prairie Rose Way', 'Berkeley', 'CA', '94705',
 37.874902, -122.258939, 'United States',
 '68-2909219', '618-21-4292', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Manager'),

('Miles', 'Cummerata', 'Maggio', 49, 'male', 'yraigatt3@nature.com', '+86 461 145 4186', 'yraigatt3', 'sRQxjPfdS',
 '1969-01-16', 'https://robohash.org/Miles.png?set=set4', 'B+', 157, 95.9, 'Gray', 'Blond', 'Curly',
 'homestead.com', '243.20.78.113', '150 Carter Street', 'Manchester', 'CT', '06040',
 41.765560, -72.473091, 'United States',
 'Wolff and Sons', 'Services', 'Operator',
 '81 Seaton Place Northwest', 'Washington', 'DC', '20001',
 38.914949, -77.011702, 'United States',
 '78-3192791', '769-78-8422', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Developer'),

('Mavis', 'Schultz', 'Yundt', 38, 'male', 'kmeus4@upenn.edu', '+372 285 771 1911', 'kmeus4', 'aUTdmmmbH',
 '1968-11-03', 'https://robohash.org/Mavis.png?set=set4', 'O+', 188, 106.3, 'Brown', 'Brown', 'Curly',
 'columbia.edu', '103.72.86.183', '2721 Lindsay Avenue', 'Louisville', 'KY', '40206',
 38.263793, -85.700243, 'United States',
 'Adams Inc', 'IT', 'Web Developer I',
 '5906 Milton Avenue', 'Deale', 'MD', '20751',
 38.784451, -76.541254, 'United States',
 '52-5262907', '250-53-5247', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Developer');

