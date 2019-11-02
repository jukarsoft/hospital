-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-08-2019 a las 12:13:42
-- Versión del servidor: 10.1.33-MariaDB
-- Versión de PHP: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hospital`
--
CREATE DATABASE IF NOT EXISTS `hospital` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `hospital`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

DROP TABLE IF EXISTS `paciente`;
CREATE TABLE `paciente` (
  `idpaciente` int(11) NOT NULL,
  `nif` varchar(10) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `fechaingreso` date DEFAULT NULL,
  `fechaalta` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`idpaciente`, `nif`, `nombre`, `apellidos`, `fechaingreso`, `fechaalta`) VALUES
(1, '12345678L', 'david', 'alcolea', '2019-03-13', NULL),
(2, '12345645H', 'Joan', 'Pi', '2019-03-13', '0000-00-00'),
(4, '12545645H', 'Margaret', 'Rose', '2019-03-13', NULL),
(7, '34567897U', 'John', 'Rambo', '2019-03-20', '0000-00-00'),
(10, '12345644Y', 'Anne', 'Rambo', '2019-03-04', NULL),
(12, '12121212H', 'Pau', 'Pou', '2019-03-14', '2019-03-27'),
(15, '4567565H', 'Johny', 'Menteros', '2019-03-05', '2019-03-13'),
(17, '44755146K', 'Margaretti', 'Rambinni', '2019-03-20', '0000-00-00'),
(18, '28209327B', 'Knauss', 'Maffei', '2019-03-05', '0000-00-00'),
(19, '49673654W', 'juan carlos ', 'moreno', '2019-06-04', '0000-00-00'),
(20, '06549135T', 'juan carlos ', 'moreno', '2019-06-04', '0000-00-00'),
(21, '17580427D', 'ramiro', 'fontseca', '2019-05-06', '2019-08-05'),
(22, '16060705N', 'javier', 'damasco', '2018-12-03', '2019-06-07'),
(23, '11204088Y', 'antonio', 'santos del toro', '2019-07-01', '2019-08-05'),
(24, '38424012M', 'carol', 'moreno', '2019-08-01', '0000-00-00'),
(25, '33327285D', 'charo', 'mejias', '2019-07-08', '0000-00-00'),
(26, '19022264E', 'pedro', 'marmol', '2019-08-01', '0000-00-00'),
(27, '91796331L', 'pedro', 'picapiedra', '2019-07-03', '0000-00-00'),
(28, '25223982C', 'maya', 'montero', '2019-01-01', '2019-08-01'),
(30, '77476808C', 'Manuel', 'Serrat', '2019-06-11', '0000-00-00'),
(31, '04424605A', 'zacario', 'zamora', '2019-07-16', '2019-07-27'),
(33, '51571289E', 'maya', 'montero', '2019-01-01', '2019-08-01'),
(35, '70312064Y', 'laura', 'gomez', '2019-08-05', '0000-00-00'),
(36, '38901418T', 'perico', 'de los palotes', '2019-05-02', '0000-00-00'),
(37, '05246870H', 'federico', 'garcia', '2019-06-13', '0000-00-00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`idpaciente`),
  ADD UNIQUE KEY `nif_UNIQUE` (`nif`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `idpaciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
