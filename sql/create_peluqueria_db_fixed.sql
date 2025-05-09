-- Crear base de datos
DROP DATABASE IF EXISTS peluqueria_db;
CREATE DATABASE peluqueria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE peluqueria_db;

-- Tabla de usuarios
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de citas
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  date_time DATETIME NOT NULL,
  cut_option VARCHAR(100) DEFAULT 'Sin especificar',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de cortes realizados
CREATE TABLE haircuts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  image_base64 LONGTEXT,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
