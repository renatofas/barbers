-- Estructura completa de la tabla haircuts para guardar cortes con imágenes en base64
DROP TABLE IF EXISTS haircuts;

CREATE TABLE haircuts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  image_base64 LONGTEXT,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
