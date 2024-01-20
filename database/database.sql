-- ----------------------------
-- Table structure for horario_empleado
-- ----------------------------
DROP TABLE IF EXISTS horario_empleado;
CREATE TABLE horario_empleado (
  id_horario INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  id_horario_general INT,
  entrada TIMESTAMP(6),
  break TIMESTAMP(6),
  visita TIMESTAMP(6),
  salida TIMESTAMP(6),
  fecha DATE
);

-- ----------------------------
-- Table structure for horario_general
-- ----------------------------
DROP TABLE IF EXISTS horario_general;
CREATE TABLE horario_general (
  id_horario_general INT AUTO_INCREMENT PRIMARY KEY,
  hora_entrada VARCHAR(100),
  hora_salida VARCHAR(100)
);

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS jobs;
CREATE TABLE jobs (
  idjobs INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  idproduct INT,
  name VARCHAR(255),
  model VARCHAR(255),
  phone_number INT,
  description VARCHAR(255),
  price INT,
  priority VARCHAR(255),
  estate BOOLEAN,
  date TIMESTAMP
);
-- COMMENT ON COLUMN jobs.priority IS 'baja,media,alta';

-- ----------------------------
-- Table structure for pagos_diarios
-- ----------------------------
DROP TABLE IF EXISTS pagos_diarios;
CREATE TABLE pagos_diarios (
  id_pagosdiarios INT AUTO_INCREMENT PRIMARY KEY,
  id_users INT,
  fecha DATE,
  monto INT
);

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  idproduct INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  cant INT,
  price FLOAT,
  img VARCHAR(255)
);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  img VARCHAR(255)
);
